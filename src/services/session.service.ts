import { createHash, randomBytes } from "node:crypto";

import {
  createSession,
  findValidRefreshSession,
  rotateSession,
} from "@/repositories/session.repository";

const ACCESS_TTL_MS = 15 * 60 * 1000;
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
const newToken = () => randomBytes(32).toString("hex");

export async function issueSession(input: { kind: "USER" | "ADMIN"; userId?: string; adminId?: string }) {
  const accessToken = newToken();
  const refreshToken = newToken();
  const now = Date.now();

  await createSession({
    ...input,
    accessTokenHash: hashToken(accessToken),
    refreshTokenHash: hashToken(refreshToken),
    accessExpiresAt: new Date(now + ACCESS_TTL_MS),
    refreshExpiresAt: new Date(now + REFRESH_TTL_MS),
  });

  return { accessToken, refreshToken, expiresIn: ACCESS_TTL_MS / 1000 };
}

export async function rotateRefreshToken(refreshToken: string, kind: "USER" | "ADMIN") {
  const session = await findValidRefreshSession(hashToken(refreshToken), kind);
  if (!session) return null;

  const accessToken = newToken();
  const nextRefreshToken = newToken();
  const now = Date.now();
  await rotateSession(session.id, {
    accessTokenHash: hashToken(accessToken),
    refreshTokenHash: hashToken(nextRefreshToken),
    accessExpiresAt: new Date(now + ACCESS_TTL_MS),
    refreshExpiresAt: new Date(now + REFRESH_TTL_MS),
  });

  return { accessToken, refreshToken: nextRefreshToken, expiresIn: ACCESS_TTL_MS / 1000 };
}

export { hashToken };