import { FastifyReply, FastifyRequest } from "fastify";

import { rotateRefreshToken } from "@/services/session.service";

export const authUserRefreshController = async (
  request: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply,
) => {
  const tokens = await rotateRefreshToken(request.body?.refreshToken ?? "", "USER");
  if (!tokens) return reply.code(401).send({ statusCode: 401, message: "Refresh token inválido ou expirado." });
  return reply.send({ statusCode: 200, tokens });
};