import { createHash } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";

import { findValidAccessSession } from "@/repositories/session.repository";
import { findAdminById } from "@/repositories/admin.repository";

export async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    await reply.code(401).send({ statusCode: 401, message: "Não autenticado." });
    return null;
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const session = await findValidAccessSession(tokenHash, "ADMIN");
  const admin = session?.adminId ? await findAdminById(session.adminId) : null;

  if (!admin || admin.status !== "ACTIVE") {
    await reply.code(401).send({ statusCode: 401, message: "Sessão inválida ou expirada." });
    return null;
  }

  return admin;
}