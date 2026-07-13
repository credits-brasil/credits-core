import { AppError } from "@/constants/spc";

import { FriendlyError, getTipoConsumidor } from "@/utils";
import { HTTPSPCService } from "@/services";

export async function spc695UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos = new Set([
    18, 49, 5180, 5262, 5266, 5195, 5194, 5244, 5178, 5185, 5241, 5224, 5227,
    5239, 5257, 5253, 5142, 5232, 5228, 5229, 5245, 5268,
  ]);

  const invalidInsumos = insumos.filter(
    (insumo) => !allowedInsumos.has(insumo),
  );

  if (invalidInsumos.length > 0) {
    throw new FriendlyError({
      message: `Insumos inválidos: ${invalidInsumos.join(", ")}`,
      context: "spc325UseCase.validation",
      code: 400,
    });
  }

  try {
    const { xml, json } = await HTTPSPCService({
      productCode: 695,
      tipoConsumidor: getTipoConsumidor(typeDocument),
      document,
      insumos,
    });

    return {
      // xml: soapXml,
      json2: json,
    };
  } catch (error) {
    throw new FriendlyError({
      message: AppError.GET_ALL_BRANDS_ERROR,
      originalError: error,
      context: "spcUseCase",
      code: 400,
    });
  }
}
