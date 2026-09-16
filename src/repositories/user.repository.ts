import { CreateUserInput, UpdateUserInput } from "@/interfaces/user";

import { UserStatus } from "../generated/prisma/enums";

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

export const createUser = (data: CreateUserInput & { password: string }) => {
  return prisma.user.create({ data, select: safeSelect });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserByEmailOrCpf = (email: string, cpf: string) => {
  return prisma.user.findFirst({ where: { OR: [{ email }, { cpf }] } });
};

export const listUsers = (search?: string) => {
  const term = search?.trim();

  return prisma.user.findMany({
    where: {
      status: { not: UserStatus.DELETED },
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

export const updateUser = (id: string, data: UpdateUserInput) => {
  return prisma.user.update({ where: { id }, data, select: safeSelect });
};

export const softDeleteUser = (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { status: UserStatus.DELETED },
    select: safeSelect,
  });
};
