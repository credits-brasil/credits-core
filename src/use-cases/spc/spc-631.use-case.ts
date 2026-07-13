import { AppError } from "@/constants/spc";

import { FriendlyError, getTipoConsumidor } from "@/utils";
import { HTTPSPCService } from "@/services";

export async function spc631UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos = new Set([
    18, 49, 5262, 5244, 5178, 5185, 5241, 5224, 5226, 5193, 5263, 5257, 5260,
    5240, 5256, 5265, 5264, 5179, 5225, 24, 5258, 55, 5186, 5267, 5184, 5261,
    5229, 5247, 5245, 5259, 23, 77, 5183,
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
      productCode: 631,
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
