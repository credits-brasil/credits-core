BEGIN;

ALTER TABLE "users"
  ALTER COLUMN "user" DROP NOT NULL,
  ALTER COLUMN "email" DROP NOT NULL;

ALTER TABLE "users"
  ADD CONSTRAINT "users_user_or_email_check"
  CHECK (("user" IS NOT NULL) <> ("email" IS NOT NULL))
  NOT VALID;

COMMIT;