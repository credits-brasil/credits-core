import { randomBytes, scryptSync } from "node:crypto";

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derivedKey = scryptSync(password, salt, 64);

  return `${salt}:${derivedKey.toString("hex")}`;
}
