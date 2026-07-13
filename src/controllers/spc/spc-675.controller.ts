import { FastifyReply, FastifyRequest } from "fastify";

import { SPCUseCases } from "@/use-cases/spc";

import { FriendlyError } from "@/utils/friendly-error";

import { AppError, AppMessages } from "@/constants/spc";

export const spc675Controller = async (request: FastifyRequest<{ Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] } }>, reply: FastifyReply) => {
    const { document, typeDocument, insumos } = request.body;

  const spcUseCases = new SPCUseCases();

  try {
    const spc = await spcUseCases.spc675(document, typeDocument, insumos);

    return reply.code(200).send({ statusCode: 200, message: AppMessages.GET_ALL_BRANDS_SUCCESS, spc });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply
        .code((error as FriendlyError).code)
        .send({ statusCode: (error as FriendlyError).code, message: (error as FriendlyError).message });
    } else {
      return reply.code(500).send({ statusCode: 500, message: AppError.INTERNAL_SERVER_ERROR });
    }
  }
};