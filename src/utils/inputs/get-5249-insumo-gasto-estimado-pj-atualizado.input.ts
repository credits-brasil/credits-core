export const get5249InsumoGastoEstimadoPJAtualizadoInput =
  (insumoGastoEstimadoPJAtualizado: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
        "valor-total"?: string;
      };
    };
    "detalhe-insumo-gasto-estimado-pj-atualizado"?:
      | {
          $?: {
            valor?: string;
          };
        }
      | {
          $?: {
            valor?: string;
          };
        }[];
  }): {
    resumo: {
      "quantidade-total"?: string;
      "valor-total"?: string;
    };
    "detalhe-insumo-gasto-estimado-pj-atualizado": {
      valor?: string;
    }[];
  } => ({
    resumo: {
      "quantidade-total":
        insumoGastoEstimadoPJAtualizado?.resumo?.$?.["quantidade-total"],
      "valor-total":
        insumoGastoEstimadoPJAtualizado?.resumo?.$?.["valor-total"],
    },

    "detalhe-insumo-gasto-estimado-pj-atualizado": (() => {
      const detalhes =
        insumoGastoEstimadoPJAtualizado?.[
          "detalhe-insumo-gasto-estimado-pj-atualizado"
        ];

      const lista = Array.isArray(detalhes)
        ? detalhes
        : detalhes
          ? [detalhes]
          : [];

      return lista.map((i) => ({
        valor: i.$?.valor,
      }));
    })(),
  });
