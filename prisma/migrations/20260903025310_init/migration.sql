-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "CompanyPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "OperatorRole" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "OperatorCompanyStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PROCESS',
    "code" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "report_name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "origin" TEXT NOT NULL DEFAULT 'API',
    "ip" TEXT NOT NULL,
    "external_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip" JSONB NOT NULL,
    "mounth_limit" INTEGER NOT NULL DEFAULT 1000,
    "day_limit" INTEGER NOT NULL DEFAULT 1000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "operator_SPC" TEXT,
    "operator_SPC_password" TEXT,
    "limit_consults" INTEGER NOT NULL DEFAULT 1000,
    "period_limit_consults" "CompanyPeriod" NOT NULL DEFAULT 'DAILY',
    "tasting_product_quantity" INTEGER NOT NULL DEFAULT 0,
    "tasting_start_date" TIMESTAMP(3),
    "tasting_end_date" TIMESTAMP(3),
    "status" "CompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operators" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_operators" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "role" "OperatorRole" NOT NULL DEFAULT 'OPERATOR',
    "status" "OperatorCompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_operators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "orders_id_client_id_document_code_ip_idx" ON "orders"("id", "client_id", "document", "code", "ip");

-- CreateIndex
CREATE INDEX "companies_cnpj_idx" ON "companies"("cnpj");

-- CreateIndex
CREATE INDEX "companies_name_idx" ON "companies"("name");

-- CreateIndex
CREATE INDEX "companies_status_idx" ON "companies"("status");

-- CreateIndex
CREATE INDEX "operators_cpf_idx" ON "operators"("cpf");

-- CreateIndex
CREATE INDEX "operators_name_idx" ON "operators"("name");

-- CreateIndex
CREATE INDEX "company_operators_operatorId_idx" ON "company_operators"("operatorId");

-- CreateIndex
CREATE INDEX "company_operators_companyId_idx" ON "company_operators"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "company_operators_operatorId_companyId_key" ON "company_operators"("operatorId", "companyId");

-- AddForeignKey
ALTER TABLE "company_operators" ADD CONSTRAINT "company_operators_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_operators" ADD CONSTRAINT "company_operators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "operators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
