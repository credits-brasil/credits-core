import { AppError } from "@/constants/spc";

import { FriendlyError, getTipoConsumidor } from "@/utils";
import { HTTPSPCService } from "@/services";

export async function spc257UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos = new Set([
    5262, 5266, 5195, 5194, 5244, 5185, 5241, 5224, 5226, 5227, 5190, 5193,
    5179, 5142, 5232, 17, 5184, 5228, 5229, 5247, 5245, 5259, 23, 3082, 78, 77,
    5183, 5268,
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
      productCode: 257,
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
