-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "product_name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "acceptedTerms" BOOLEAN NOT NULL DEFAULT false;
