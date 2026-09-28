CREATE TABLE IF NOT EXISTS "user_sessions" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "user_sessions_tokenHash_key" ON "user_sessions"("tokenHash");
CREATE INDEX IF NOT EXISTS "user_sessions_userId_idx" ON "user_sessions"("userId");
CREATE INDEX IF NOT EXISTS "user_sessions_expiresAt_idx" ON "user_sessions"("expiresAt");