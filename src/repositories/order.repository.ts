import { prisma } from "./prisma";
import type { Prisma } from "../generated/prisma/client";
import { createBackgroundQueue } from "./background-queue";
import { FriendlyError } from "@/utils/friendly-error";
import {
  getConsultationPeriodStarts,
  isConsultationLimitReached,
} from "@/utils/company-consultation-limits";

export type CreateOrderInput = {
  id?: string;
  userId: string;
  userName: string;
  companyId: string;
  companyName: string;
  productName: string;
  typeDocument: "CPF" | "CNPJ";
  document: string;
  protocol?: string | null;
  inputs: Prisma.InputJsonValue;
  ip: string;
  host: string;
  error?: string | null;
};

export const normalizeProtocolValue = (protocol: unknown): string | null => {
  if (protocol === null || protocol === undefined) {
    return null;
  }

  if (typeof protocol === "string") {
    const normalized = protocol.trim();
    return normalized.length > 0 ? normalized : null;
  }

  if (typeof protocol === "number") {
    return String(protocol);
  }

  if (typeof protocol === "object") {
    const candidate = protocol as Record<string, unknown>;
    const nested = candidate.$ as Record<string, unknown> | undefined;
    const normalizedNested = nested ? normalizeProtocolValue(nested) : null;

    if (normalizedNested) {
      return normalizedNested;
    }

    const numero = candidate.numero ?? candidate.numeroProtocolo ?? candidate.number ?? candidate.value;
    const digito = candidate.digito ?? candidate.digit ?? candidate.checkDigit;

    if (numero || digito) {
      const combined = [numero, digito].filter((value) => value !== null && value !== undefined && String(value).trim() !== "");
      return combined.map((value) => String(value)).join("");
    }
  }

  const stringValue = String(protocol).trim();
  return stringValue.length > 0 ? stringValue : null;
};

export const createOrder = (data: CreateOrderInput) =>
  prisma.$transaction(async (transaction) => {
    await transaction.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM companies WHERE id = ${data.companyId} FOR UPDATE
    `;

    const company = await transaction.company.findUnique({
      where: { id: data.companyId },
      select: {
        limit_consults_daily: true,
        limit_consults_monthly: true,
      },
    });

    if (!company) {
      throw new FriendlyError({
        message: "Empresa não encontrada.",
        context: "order.create.company",
        code: 404,
      });
    }

    const { dayStart, monthStart } = getConsultationPeriodStarts(new Date());
    const dailyCount = await transaction.order.count({
      where: { company_id: data.companyId, createdAt: { gte: dayStart } },
    });
    const monthlyCount = await transaction.order.count({
      where: { company_id: data.companyId, createdAt: { gte: monthStart } },
    });

    if (isConsultationLimitReached(company.limit_consults_daily, dailyCount)) {
      throw new FriendlyError({
        message: "Limite diário de consultas desta empresa atingido.",
        context: "order.create.daily-limit",
        code: 429,
      });
    }

    if (isConsultationLimitReached(company.limit_consults_monthly, monthlyCount)) {
      throw new FriendlyError({
        message: "Limite mensal de consultas desta empresa atingido.",
        context: "order.create.monthly-limit",
        code: 429,
      });
    }

    return transaction.order.create({
      data: {
        ...(data.id ? { id: data.id } : {}),
        user_id: data.userId,
        user_name: data.userName,
        company_id: data.companyId,
        company_name: data.companyName,
        product_name: data.productName,
        protocol: normalizeProtocolValue(data.protocol),
        typeDocument: data.typeDocument,
        document: data.document,
        duration: 0,
        inputs: data.inputs,
        origin: "WEB",
        ip: data.ip,
        host: data.host,
        status: "PROCESS",
      },
    });
  });

export const finishOrder = (
  id: string,
  duration: number,
  status: "SUCCESS" | "FAILED",
  protocol?: string | null,
  error?: string | null,
) => {
  const normalizedProtocol = normalizeProtocolValue(protocol);

  return prisma.order.update({
    where: { id },
    data: {
      duration,
      status,
      ...(protocol !== undefined ? { protocol: normalizedProtocol } : {}),
      ...(error !== undefined ? { error: error?.trim() ? error : null } : {}),
    },
  });
};

type OrderWriteJob =
  | { type: "CREATE"; data: CreateOrderInput }
  | {
      type: "FINISH";
      id: string;
      duration: number;
      status: "SUCCESS" | "FAILED";
      protocol?: string | null;
      error?: string | null;
    };

const orderWriteQueue = createBackgroundQueue(async (job: OrderWriteJob) => {
  if (job.type === "CREATE") {
    await createOrder(job.data);
    return;
  }

  await finishOrder(job.id, job.duration, job.status, job.protocol, job.error);
});

export const enqueueCreateOrder = (id: string, data: CreateOrderInput) => {
  orderWriteQueue.enqueue({ type: "CREATE", data: { ...data, id } });
};

export const enqueueFinishOrder = (
  id: string,
  duration: number,
  status: "SUCCESS" | "FAILED",
  protocol?: string | null,
  error?: string | null,
) => {
  orderWriteQueue.enqueue({ type: "FINISH", id, duration, status, protocol, error });
};

export const flushOrderWriteQueue = () => orderWriteQueue.flush();

export const listOrders = (input: {
  page: number;
  pageSize: number;
  search?: string;
  status?: "PROCESS" | "SUCCESS" | "FAILED";
  companyId?: string;
}) => {
  const search = input.search?.trim();
  const where = {
    ...(input.status ? { status: input.status } : {}),
    ...(input.companyId ? { company_id: input.companyId } : {}),
    ...(search
      ? {
          OR: [
            { user_name: { contains: search, mode: "insensitive" as const } },
            { company_name: { contains: search, mode: "insensitive" as const } },
            { document: { contains: search, mode: "insensitive" as const } },
            { protocol: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  return Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (input.page - 1) * input.pageSize,
      take: input.pageSize,
    }),
    prisma.order.count({ where }),
  ]);
};