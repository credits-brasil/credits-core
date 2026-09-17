BEGIN;

ALTER TABLE "password_reset_codes"
  RENAME COLUMN "expiresAt" TO "codeExpiresAt";

ALTER INDEX "password_reset_codes_userId_expiresAt_idx"
  RENAME TO "password_reset_codes_userId_codeExpiresAt_idx";

COMMIT;