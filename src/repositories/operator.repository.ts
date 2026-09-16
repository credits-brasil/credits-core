import { hashPassword } from "@/utils";

import { prisma } from "./prisma";

const safeSelect = {
  id: true,
  companyId: true,
  operatorId: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  operator: {
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  company: {
    select: {
      id: true,
      name: true,
      cnpj: true,
      status: true,
    },
  },
} as const;

export const createCompanyOperator = (companyId: string, operatorId: string, data: { role?: string; status?: string }) => {
  return prisma.companyOperator.create({
    data: {
      companyId,
      operatorId,
      role: data.role as any,
      status: data.status as any,
    },
    select: safeSelect,
  });
};

export const findCompanyOperatorById = (id: string) => {
  return prisma.companyOperator.findUnique({ where: { id }, select: safeSelect });
};

export const findCompanyOperatorByCompanyAndOperator = (companyId: string, operatorId: string) => {
  return prisma.companyOperator.findUnique({
    where: { operatorId_companyId: { companyId, operatorId } },
    select: safeSelect,
  });
};

export const listCompanyOperatorsByCompany = (companyId: string) => {
  return prisma.companyOperator.findMany({
    where: { companyId },
    select: safeSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const updateCompanyOperator = (id: string, data: { role?: string; status?: string }) => {
  return prisma.companyOperator.update({
    where: { id },
    data: {
      role: data.role as any,
      status: data.status as any,
    },
    select: safeSelect,
  });
};

export const softDeleteCompanyOperator = (id: string) => {
  return prisma.companyOperator.update({
    where: { id },
    data: { status: "INACTIVE" },
    select: safeSelect,
  });
};

export const createOperator = (data: { user?: string; name: string; cpf: string; email: string; phone: string; password: string }) => {
  const normalizedPassword = data.password.replace(/\D/g, "");

  return prisma.operator.create({
    data: {
      ...data,
      user: data.user?.trim() || String(Math.floor(10000000 + Math.random() * 90000000)),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: hashPassword(normalizedPassword),
    },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findOperatorById = (id: string) => {
  return prisma.operator.findUnique({
    where: { id },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findOperatorByCpf = (cpf: string) => {
  return prisma.operator.findFirst({
    where: { cpf },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findOperatorByEmail = (email: string) => {
  return prisma.operator.findFirst({
    where: { email },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findOperatorByPhone = (phone: string) => {
  return prisma.operator.findFirst({
    where: { phone },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateOperator = (id: string, data: { user?: string; name?: string; cpf?: string; email?: string; phone?: string; password?: string }) => {
  return prisma.operator.update({
    where: { id },
    data: {
      ...data,
      ...(data.user ? { user: data.user.trim() } : {}),
      ...(data.email ? { email: data.email.trim().toLowerCase() } : {}),
      ...(data.phone ? { phone: data.phone.trim() } : {}),
      ...(data.password ? { password: hashPassword(data.password.replace(/\D/g, "")) } : {}),
    },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
