BEGIN;

ALTER TABLE "password_reset_codes"
  ADD COLUMN "resetToken" TEXT;

CREATE UNIQUE INDEX "password_reset_codes_resetToken_key"
  ON "password_reset_codes"("resetToken");

COMMIT;