import { DecryptCommand, EncryptCommand, KMSClient } from "@aws-sdk/client-kms";

export function getKmsClient() {
  return new KMSClient({
    region: process.env.AWS_REGION ?? "us-east-1",
  });
}

export async function encryptCompanyPassword(
  companyId: string,
  plainText: string,
  kmsClient: Pick<KMSClient, "send"> = getKmsClient(),
) {
  const cleanCompanyId = companyId?.trim();
  const cleanPassword = plainText?.trim();

  if (!cleanCompanyId) {
    throw new Error("companyId is required to encrypt company password");
  }

  if (!cleanPassword) {
    return undefined;
  }

  const keyId = process.env.KMS_KEY_ID;

  if (!keyId) {
    throw new Error("KMS_KEY_ID is not configured");
  }

  const result = await kmsClient.send(
    new EncryptCommand({
      KeyId: keyId,
      Plaintext: Buffer.from(cleanPassword, "utf8"),
      EncryptionContext: {
        companyId: cleanCompanyId,
      },
    }),
  );

  if (!result.CiphertextBlob) {
    throw new Error("KMS encryption returned an empty CiphertextBlob");
  }

  return Buffer.from(result.CiphertextBlob).toString("base64");
}

export async function decryptCompanyPassword(
  companyId: string,
  encryptedText: string,
  kmsClient: Pick<KMSClient, "send"> = getKmsClient(),
) {
  const cleanCompanyId = companyId?.trim();
  const cleanValue = encryptedText?.trim();

  if (!cleanCompanyId || !cleanValue) {
    return undefined;
  }

  const keyId = process.env.KMS_KEY_ID;

  if (!keyId) {
    throw new Error("KMS_KEY_ID is not configured");
  }

  const result = await kmsClient.send(
    new DecryptCommand({
      CiphertextBlob: Buffer.from(cleanValue, "base64"),
      EncryptionContext: {
        companyId: cleanCompanyId,
      },
    }),
  );

  if (!result.Plaintext) {
    throw new Error("KMS decryption returned an empty Plaintext");
  }

  return Buffer.from(result.Plaintext).toString("utf8");
}
