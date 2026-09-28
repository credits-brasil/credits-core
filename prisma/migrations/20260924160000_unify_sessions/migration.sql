CREATE TYPE "SessionKind" AS ENUM ('USER', 'ADMIN');

CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "kind" "SessionKind" NOT NULL,
    "userId" TEXT,
    "adminId" TEXT,
    "accessTokenHash" TEXT NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "accessExpiresAt" TIMESTAMP(3) NOT NULL,
    "refreshExpiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "sessions_accessTokenHash_key" ON "sessions"("accessTokenHash");
CREATE UNIQUE INDEX "sessions_refreshTokenHash_key" ON "sessions"("refreshTokenHash");
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");
CREATE INDEX "sessions_adminId_idx" ON "sessions"("adminId");
CREATE INDEX "sessions_refreshExpiresAt_idx" ON "sessions"("refreshExpiresAt");

DROP TABLE IF EXISTS "user_sessions";
DROP TABLE IF EXISTS "admin_sessions";