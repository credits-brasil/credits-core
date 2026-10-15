import { prisma } from "./prisma";
import type { Prisma } from "../generated/prisma/client";

export type CreateOrderInput = {
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
  prisma.order.create({
    data: {
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

export const finishOrder = (
  id: string,
  duration: number,
  status: "SUCCESS" | "FAILED",
  protocol?: string | null,
) => {
  const normalizedProtocol = normalizeProtocolValue(protocol);

  return prisma.order.update({
    where: { id },
    data: {
      duration,
      status,
      ...(protocol !== undefined ? { protocol: normalizedProtocol } : {}),
    },
  });
};

export const listOrders = (input: {
  page: number;
  pageSize: number;
  search?: string;
  status?: "PROCESS" | "SUCCESS" | "FAILED";
}) => {
  const search = input.search?.trim();
  const where = {
    ...(input.status ? { status: input.status } : {}),
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