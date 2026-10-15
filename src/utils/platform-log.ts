import { createHash } from "node:crypto";
import { FastifyRequest } from "fastify";

import { findAdminById } from "@/repositories/admin.repository";
import { findValidAccessSession } from "@/repositories/session.repository";
import { findUserById } from "@/repositories/user.repository";
import { PlatformLogEntryInput, savePlatformLog, PlatformLogActor, normalizePlatformSource } from "@/repositories/platform-log.repository";

export const resolvePlatformSource = (request: FastifyRequest): string => {
  const explicitSource = [
    request.headers["x-platform-source"],
    request.headers["x-client-app"],
    request.headers["x-app-source"],
  ].find((value): value is string => typeof value === "string" && value.trim().length > 0);

  if (explicitSource) {
    return normalizePlatformSource(explicitSource);
  }

  const origin = request.headers.origin ?? request.headers.referer ?? "";
  const hostname = (() => {
    try {
      return new URL(origin).hostname;
    } catch {
      return typeof origin === "string" ? origin.toLowerCase() : "";
    }
  })();

  if (hostname.includes("credits-platform-manager")) {
    return "credits-platform-manager";
  }

  if (hostname.includes("credits-platform")) {
    return "credits-platform";
  }

  return "SYSTEM";
};

export const resolveRequestActor = async (request: FastifyRequest): Promise<PlatformLogActor> => {
  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    return { kind: "SYSTEM", name: "Sistema" };
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");

  const [userSession, adminSession] = await Promise.all([
    findValidAccessSession(tokenHash, "USER"),
    findValidAccessSession(tokenHash, "ADMIN"),
  ]);

  if (userSession?.userId) {
    const user = await findUserById(userSession.userId);
    if (user) {
      return {
        kind: "USER",
        userId: user.id,
        name: user.name,
        email: user.email ?? undefined,
        role: "USER",
      };
    }
  }

  if (adminSession?.adminId) {
    const admin = await findAdminById(adminSession.adminId);
    if (admin) {
      return {
        kind: "ADMIN",
        userId: admin.id,
        name: admin.name,
        email: admin.email,
        role: "ADMIN",
      };
    }
  }

  return { kind: "SYSTEM", name: "Sistema" };
};

export const logPlatformAction = async (
  request: FastifyRequest,
  input: Omit<PlatformLogEntryInput, "actor" | "ip" | "userAgent" | "requestPath" | "source"> & {
    actor?: PlatformLogActor;
  },
) => {
  try {
    const actor = input.actor ?? (await resolveRequestActor(request));

    await savePlatformLog({
      ...input,
      actor,
      source: resolvePlatformSource(request),
      ip: (request.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ?? request.ip ?? null,
      userAgent: (request.headers["user-agent"] as string | undefined) ?? null,
      requestPath: request.url,
      metadata: {
        ...(input.metadata ?? {}),
        host: request.headers.host ?? null,
        origin: request.headers.origin ?? null,
        referer: request.headers.referer ?? null,
        forwardedFor: (request.headers["x-forwarded-for"] as string | undefined) ?? null,
        xForwardedProto: (request.headers["x-forwarded-proto"] as string | undefined) ?? null,
      },
    });
  } catch (error) {
    console.error("Platform log save failed:", error);
  }
};
