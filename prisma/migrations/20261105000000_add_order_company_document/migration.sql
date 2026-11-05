ALTER TABLE "orders"
ADD COLUMN "company_document" TEXT NOT NULL DEFAULT '';

UPDATE "orders" AS "order"
SET "company_document" = "company"."cnpj"
FROM "companies" AS "company"
WHERE "company"."id" = "order"."company_id"
  AND "company_document" = '';

ALTER TABLE "orders"
ALTER COLUMN "company_document" DROP DEFAULT;
