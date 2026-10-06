import { CreateCompanyInput, UpdateCompanyInput } from "@/interfaces/company";

import { CompanyStatus } from "../generated/prisma/enums";

import { prisma } from "./prisma";

export const createCompany = (data: CreateCompanyInput) => {
  return prisma.company.create({ data });
};

export const findCompanyById = (id: string) => {
  return prisma.company.findUnique({ where: { id } });
};

export const findCompanyByCnpj = (cnpj: string) => {
  return prisma.company.findFirst({ where: { cnpj } });
};

export const listCompanies = (search?: string) => {
  const term = search?.trim();

  return prisma.company.findMany({
    where: {
      status: { not: CompanyStatus.DELETED },
      ...(term
        ? {
            OR: [
              { name: { contains: term, mode: "insensitive" } },
              { cnpj: { contains: term, mode: "insensitive" } },
              { operator_SPC: { contains: term, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });
};

export const listCompaniesByUser = (userId: string) => {
  return prisma.companyUser
    .findMany({
      where: {
        userId,
        status: { not: "INACTIVE" },
        company: {
          status: { not: CompanyStatus.DELETED },
        },
      },
      select: {
        role: true,
        status: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    .then((relations) =>
      relations.map((relation) => ({
        ...relation.company,
        role: relation.role,
        companyStatus: relation.status,
      }))
    );
};

export const updateCompany = (id: string, data: UpdateCompanyInput) => {
  return prisma.company.update({ where: { id }, data });
};

export const softDeleteCompany = (id: string) => {
  return prisma.company.update({
    where: { id },
    data: { status: CompanyStatus.DELETED },
  });
};
