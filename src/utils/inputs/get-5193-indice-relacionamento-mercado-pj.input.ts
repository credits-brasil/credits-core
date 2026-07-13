export const get5193IndiceRelacionamentoMercadoPJInput =
  (indiceRelacionamentoMercadoPJ: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-indice-relacionamento-mercado-pj"?:
      | {
          mensagem?: {
            $?: {
              retorno?: string;
            };
          };
          valor?: string;
        }
      | {
          mensagem?: {
            $?: {
              retorno?: string;
            };
          };
          valor?: string;
        }[];
  }): {
    resumo: {
      "quantidade-total"?: string;
    };
    "detalhe-indice-relacionamento-mercado-pj": {
      mensagem?: string;
      valor?: string;
    }[];
  } => ({
    resumo: {
      "quantidade-total":
        indiceRelacionamentoMercadoPJ?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-indice-relacionamento-mercado-pj": (() => {
      const detalhes =
        indiceRelacionamentoMercadoPJ?.[
          "detalhe-indice-relacionamento-mercado-pj"
        ];

      const lista = Array.isArray(detalhes)
        ? detalhes
        : detalhes
          ? [detalhes]
          : [];

      return lista.map((i) => ({
        mensagem: i.mensagem?.$?.retorno,
        valor: i.valor,
      }));
    })(),
  });
