-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "protocol" TEXT;

-- CreateIndex
CREATE INDEX "orders_protocol_idx" ON "orders"("protocol");
