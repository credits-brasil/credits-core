export const get5265InsumoParticipacaoMercadoCapitaisInput =
  (insumoParticipacaoMercadoCapitais: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-insumo-participacao-mercado-capitais"?: {
      "numero-documento"?: string;
      "participante-mercado-capital"?: string;
      "tipo-pessoa"?: string;
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };
    "detalhe-insumo-participacao-mercado-capitais": {
      "numero-documento"?: string;
      "participante-mercado-capital"?: string;
      "tipo-pessoa"?: string;
    };
  } => ({
    resumo: {
      "quantidade-total":
        insumoParticipacaoMercadoCapitais?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-insumo-participacao-mercado-capitais": {
      "numero-documento":
        insumoParticipacaoMercadoCapitais?.[
          "detalhe-insumo-participacao-mercado-capitais"
        ]?.["numero-documento"],

      "participante-mercado-capital":
        insumoParticipacaoMercadoCapitais?.[
          "detalhe-insumo-participacao-mercado-capitais"
        ]?.["participante-mercado-capital"],

      "tipo-pessoa":
        insumoParticipacaoMercadoCapitais?.[
          "detalhe-insumo-participacao-mercado-capitais"
        ]?.["tipo-pessoa"],
    },
  });
