export const get5260InsumoHistoricoOperacoesAgronegocioB3Input =
  (insumoHistoricoOperacoesAgronegocioB3: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-insumo-historico-operacoes-agronegocio-B3"?: {
      $?: {
        "indicador-resultado-consulta-parcial"?: string;
        "quantidade-cprs"?: string;
        "valor-total-cprs"?: string;
      };
      "cedula-produto-rural"?: {
        "dados-entrega"?: {
          $?: {
            "prazo-documento-dias"?: string;
          };
        };
      };
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };
    "detalhe-insumo-historico-operacoes-agronegocio-B3": {
      "indicador-resultado-consulta-parcial"?: string;
      "quantidade-cprs"?: string;
      "valor-total-cprs"?: string;
      "cedula-produto-rural": {
        "dados-entrega": {
          "prazo-documento-dias"?: string;
        };
      };
    };
  } => ({
    resumo: {
      "quantidade-total":
        insumoHistoricoOperacoesAgronegocioB3?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-insumo-historico-operacoes-agronegocio-B3": {
      "indicador-resultado-consulta-parcial":
        insumoHistoricoOperacoesAgronegocioB3?.[
          "detalhe-insumo-historico-operacoes-agronegocio-B3"
        ]?.$?.["indicador-resultado-consulta-parcial"],

      "quantidade-cprs":
        insumoHistoricoOperacoesAgronegocioB3?.[
          "detalhe-insumo-historico-operacoes-agronegocio-B3"
        ]?.$?.["quantidade-cprs"],

      "valor-total-cprs":
        insumoHistoricoOperacoesAgronegocioB3?.[
          "detalhe-insumo-historico-operacoes-agronegocio-B3"
        ]?.$?.["valor-total-cprs"],

      "cedula-produto-rural": {
        "dados-entrega": {
          "prazo-documento-dias":
            insumoHistoricoOperacoesAgronegocioB3?.[
              "detalhe-insumo-historico-operacoes-agronegocio-B3"
            ]?.["cedula-produto-rural"]?.["dados-entrega"]?.$?.[
              "prazo-documento-dias"
            ],
        },
      },
    },
  });
