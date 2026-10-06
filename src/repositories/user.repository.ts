import { hashPassword } from "@/utils";

import { prisma } from "./prisma";

const safeSelect = {
  id: true,
  companyId: true,
  userId: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
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

export const createCompanyUser = (companyId: string, userId: string, data: { role?: string; status?: string }) => {
  return prisma.companyUser.create({
    data: {
      companyId,
      userId,
      role: data.role as any,
      status: data.status as any,
    },
    select: safeSelect,
  });
};

export const findCompanyUserById = (id: string) => {
  return prisma.companyUser.findUnique({ where: { id }, select: safeSelect });
};

export const findCompanyUserByCompanyAndUser = (companyId: string, userId: string) => {
  return prisma.companyUser.findUnique({
    where: { userId_companyId: { companyId, userId } },
    select: safeSelect,
  });
};

export const listCompanyUsersByCompany = (companyId: string) => {
  return prisma.companyUser.findMany({
    where: { companyId },
    select: safeSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const listUsersWithCompanies = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
      companies: {
        select: {
          id: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          company: {
            select: {
              id: true,
              name: true,
              cnpj: true,
              status: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateCompanyUser = (id: string, data: { role?: string; status?: string }) => {
  return prisma.companyUser.update({
    where: { id },
    data: {
      role: data.role as any,
      status: data.status as any,
    },
    select: safeSelect,
  });
};

export const softDeleteCompanyUser = (id: string) => {
  return prisma.companyUser.update({
    where: { id },
    data: { status: "DELETED" },
    select: safeSelect,
  });
};

export const createUser = (data: { user?: string | null; name: string; cpf: string; email?: string | null; phone: string; password: string }) => {

  return prisma.user.create({
    data: {
      ...data,
      user: data.user?.trim() || null,
      email: data.email?.trim().toLowerCase() || null,
      phone: data.phone.trim(),
      password: hashPassword(data.password),
    },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserByCpf = (cpf: string) => {
  return prisma.user.findFirst({
    where: { cpf },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserByPhone = (phone: string) => {
  return prisma.user.findFirst({
    where: { phone },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = (id: string, data: { user?: string; name?: string; cpf?: string; email?: string; phone?: string; password?: string }) => {
  return prisma.user.update({
    where: { id },
    data: {
      ...data,
      ...(data.user ? { user: data.user.trim() } : {}),
      ...(data.email ? { email: data.email.trim().toLowerCase() } : {}),
      ...(data.phone ? { phone: data.phone.trim() } : {}),
      ...(data.password ? { password: hashPassword(data.password) } : {}),
    },
    select: {
      id: true,
      user: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      password: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
