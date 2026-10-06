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
  inputs: Prisma.InputJsonValue;
  ip: string;
  host: string;
};

export const createOrder = (data: CreateOrderInput) =>
  prisma.order.create({
    data: {
      user_id: data.userId,
      user_name: data.userName,
      company_id: data.companyId,
      company_name: data.companyName,
      product_name: data.productName,
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

export const finishOrder = (id: string, duration: number, status: "SUCCESS" | "FAILED") =>
  prisma.order.update({
    where: { id },
    data: { duration, status },
  });

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