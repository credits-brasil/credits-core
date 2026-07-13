export const get5224IndiceComportamentoGastosCadastroPositivoInput =
  (indiceComportamento: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-indice-comportamento-gastos-cadastro-positivo"?: {
      $?: {
        "gasto-total-final"?: string;
        "gasto-total-inicial"?: string;
      };
      segmentos?: {
        $?: {
          nome?: string;
          "porcentual-representatividade"?: string;
        };
      }[];
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };
    "detalhe-indice-comportamento-gastos-cadastro-positivo": {
      "gasto-total-final"?: string;
      "gasto-total-inicial"?: string;
      segmentos: {
        nome?: string;
        "porcentual-representatividade"?: string;
      }[];
    };
  } => ({
    resumo: {
      "quantidade-total": indiceComportamento?.resumo?.$?.["quantidade-total"],
    },
    "detalhe-indice-comportamento-gastos-cadastro-positivo": {
      "gasto-total-final":
        indiceComportamento?.[
          "detalhe-indice-comportamento-gastos-cadastro-positivo"
        ]?.$?.["gasto-total-final"],
      "gasto-total-inicial":
        indiceComportamento?.[
          "detalhe-indice-comportamento-gastos-cadastro-positivo"
        ]?.$?.["gasto-total-inicial"],

      segmentos:
        indiceComportamento?.[
          "detalhe-indice-comportamento-gastos-cadastro-positivo"
        ]?.segmentos?.map((i) => ({
          nome: i.$?.nome,
          "porcentual-representatividade":
            i.$?.["porcentual-representatividade"],
        })) ?? [],
    },
  });
