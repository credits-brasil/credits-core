import axios from "axios";
import { parseStringPromise } from "xml2js";

import { FriendlyError, buildSPCSoapBody } from "@/utils";

interface SPCRequestParams {
  productCode: number;
  tipoConsumidor: "F" | "J";
  document: string;
  insumos: Array<string | number>;
}

export const HTTPSPCService = async ({
  productCode,
  tipoConsumidor,
  document,
  insumos,
}: SPCRequestParams) => {
  try {
    const response = await axios.post(
      "https://servicos.spc.org.br/spc/remoting/ws/consulta/consultaWebService",
      buildSPCSoapBody({
        productCode,
        tipoConsumidor,
        document,
        insumos,
      }),
      {
        auth: {
          username: process.env.SPC_USERNAME!,
          password: process.env.SPC_PASSWORD!,
        },
        headers: {
          "Content-Type": "text/xml;charset=UTF-8",
          Accept: "text/xml",
        },
        timeout: 30000,
      },
    );

    const xml = response.data;

    const json = await parseStringPromise(xml, {
      explicitArray: false,
      ignoreAttrs: false,
      trim: true,
    });

    return {
      xml,
      json,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data, "Erro da API SPC", error?.response);
    } else {
      console.log(error);
    }

    throw new FriendlyError({
      message: "Erro ao consultar SPC",
      originalError: error,
      context: "spcRequest",
      code: 400,
    });
  }
};
