import { createHash } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";

import { findCompanyById } from "@/repositories/company.repository";
import { findValidAccessSession } from "@/repositories/session.repository";
import { findCompanyUserByCompanyAndUser, findUserById } from "@/repositories/user.repository";

export async function requireUserCompany(
  request: FastifyRequest,
  reply: FastifyReply,
  companyId: string,
) {
  const authorization = request.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    await reply.code(401).send({ statusCode: 401, message: "Não autenticado." });
    return null;
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const session = await findValidAccessSession(tokenHash, "USER");
  if (!session?.userId) {
    await reply.code(401).send({ statusCode: 401, message: "Sessão inválida ou expirada." });
    return null;
  }

  const [user, company, relation] = await Promise.all([
    findUserById(session.userId),
    findCompanyById(companyId),
    findCompanyUserByCompanyAndUser(companyId, session.userId),
  ]);

  if (!user || !company || company.status === "DELETED" || !relation || relation.status !== "ACTIVE") {
    await reply.code(403).send({ statusCode: 403, message: "Usuário não pertence à empresa selecionada." });
    return null;
  }

  return { id: user.id, name: user.name, companyId: company.id, companyName: company.name };
}