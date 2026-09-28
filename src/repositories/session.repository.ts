import { prisma } from "./prisma";

export const createSession = (data: {
  kind: "USER" | "ADMIN";
  userId?: string;
  adminId?: string;
  accessTokenHash: string;
  refreshTokenHash: string;
  accessExpiresAt: Date;
  refreshExpiresAt: Date;
}) => prisma.session.create({ data });

export const findValidAccessSession = (accessTokenHash: string, kind: "USER" | "ADMIN") =>
  prisma.session.findFirst({
    where: {
      accessTokenHash,
      kind,
      revokedAt: null,
      accessExpiresAt: { gt: new Date() },
    },
  });

export const findValidRefreshSession = (refreshTokenHash: string, kind: "USER" | "ADMIN") =>
  prisma.session.findFirst({
    where: {
      refreshTokenHash,
      kind,
      revokedAt: null,
      refreshExpiresAt: { gt: new Date() },
    },
  });

export const rotateSession = (id: string, data: {
  accessTokenHash: string;
  refreshTokenHash: string;
  accessExpiresAt: Date;
  refreshExpiresAt: Date;
}) => prisma.session.update({ where: { id }, data });