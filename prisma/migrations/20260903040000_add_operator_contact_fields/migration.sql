-- AlterTable
ALTER TABLE "operators"
    ADD COLUMN "email" TEXT,
    ADD COLUMN "phone" TEXT;

-- Backfill existing operators
UPDATE "operators"
SET "email" = CONCAT(LOWER(REPLACE("name", ' ', '.')), '@internal.local'),
    "phone" = '0000000000'
WHERE "email" IS NULL OR "phone" IS NULL;

-- Enforce required values and uniqueness where needed
ALTER TABLE "operators"
    ALTER COLUMN "email" SET NOT NULL,
    ALTER COLUMN "phone" SET NOT NULL;

CREATE UNIQUE INDEX "operators_cpf_key"
    ON "operators"("cpf");

CREATE UNIQUE INDEX "operators_email_key"
    ON "operators"("email");

CREATE UNIQUE INDEX "operators_phone_key"
    ON "operators"("phone");

CREATE UNIQUE INDEX "company_operators_operatorId_companyId_key"
    ON "company_operators"("operatorId", "companyId");
