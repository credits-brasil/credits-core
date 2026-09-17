import { CreateAdminInput, UpdateAdminInput } from "@/interfaces/admin";

import { AdminStatus } from "../generated/prisma/enums";

import { prisma } from "./prisma";

const safeSelect = {
  id: true,
  name: true,
  cpf: true,
  email: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const createAdmin = (data: CreateAdminInput & { password: string }) => {
  return prisma.admin.create({ data, select: safeSelect });
};

export const findAdminById = (id: string) => {
  return prisma.admin.findUnique({ where: { id } });
};

export const findAdminByEmail = (email: string) => {
  return prisma.admin.findUnique({ where: { email } });
};

export const findAdminByEmailOrCpf = (email: string, cpf: string) => {
  return prisma.admin.findFirst({ where: { OR: [{ email }, { cpf }] } });
};

export const listAdmins = (search?: string) => {
  const term = search?.trim();

  return prisma.admin.findMany({
    where: {
      status: { not: AdminStatus.DELETED },
      ...(term
        ? {
            OR: [
              { name: { contains: term, mode: "insensitive" } },
              { cpf: { contains: term, mode: "insensitive" } },
              { email: { contains: term, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    select: safeSelect,
  });
};

export const updateAdmin = (id: string, data: UpdateAdminInput) => {
  return prisma.admin.update({ where: { id }, data, select: safeSelect });
};

export const softDeleteAdmin = (id: string) => {
  return prisma.admin.update({
    where: { id },
    data: { status: AdminStatus.DELETED },
    select: safeSelect,
  });
};
