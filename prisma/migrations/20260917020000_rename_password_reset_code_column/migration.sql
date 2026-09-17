BEGIN;

ALTER TABLE "password_reset_codes"
  RENAME COLUMN "codeHash" TO "code";

COMMIT;