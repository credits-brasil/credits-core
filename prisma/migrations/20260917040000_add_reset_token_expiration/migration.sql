BEGIN;

ALTER TABLE "password_reset_codes"
  ADD COLUMN "resetTokenExpiresAt" TIMESTAMP(3);

COMMIT;