import test from "node:test";
import assert from "node:assert/strict";

import { encryptCompanyPassword } from "./kms";

test("encryptCompanyPassword should use the company id as KMS encryption context", async () => {
  process.env.KMS_KEY_ID = "alias/test-company-kms";

  const captured: { companyId?: string; plaintext?: string } = {};
  const fakeKmsClient = {
    send: async (command: any) => {
      captured.companyId = command.input.EncryptionContext?.companyId;
      captured.plaintext = command.input.Plaintext?.toString("utf8");

      return {
        CiphertextBlob: Buffer.from("encrypted-value").toString("base64"),
      };
    },
  } as any;

  const encrypted = await encryptCompanyPassword(
    "company-123",
    "Senha@123",
    fakeKmsClient,
  );

  assert.equal(captured.companyId, "company-123");
  assert.equal(captured.plaintext, "Senha@123");
  assert.equal(typeof encrypted, "string");
  assert.equal(encrypted, Buffer.from("encrypted-value").toString("base64"));
});
