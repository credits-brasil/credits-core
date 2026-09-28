CREATE TABLE "admin_sessions" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "admin_sessions_tokenHash_key" ON "admin_sessions"("tokenHash");
CREATE INDEX "admin_sessions_adminId_idx" ON "admin_sessions"("adminId");
CREATE INDEX "admin_sessions_expiresAt_idx" ON "admin_sessions"("expiresAt");