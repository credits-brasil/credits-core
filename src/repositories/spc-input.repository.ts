import { prisma } from "./prisma";

export const listActiveSpcInputCodes = async (typeDocument: "CPF" | "CNPJ") => {
  const inputs = await prisma.spcInput.findMany({
    where: { typeDocument, active: true },
    select: { code: true },
  });

  return inputs.map((input) => input.code);
};

export const listSpcInputDetailsByCodes = async (
  typeDocument: "CPF" | "CNPJ",
  codes: string[],
) => {
  if (codes.length === 0) {
    return [] as Array<{ code: string; label: string }>;
  }

  const rows = await prisma.spcInput.findMany({
    where: {
      typeDocument,
      active: true,
      code: { in: codes },
    },
    select: {
      code: true,
      label: true,
    },
    orderBy: { code: "asc" },
  });

  const byCode = new Map(rows.map((row) => [row.code, row.label]));

  return codes.map((code) => ({
    code,
    label: byCode.get(code) ?? `Código ${code}`,
  }));
};