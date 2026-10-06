import { prisma } from "./prisma";

export const listActiveSpcInputCodes = async (typeDocument: "CPF" | "CNPJ") => {
  const inputs = await prisma.spcInput.findMany({
    where: { typeDocument, active: true },
    select: { code: true },
  });

  return inputs.map((input) => input.code);
};