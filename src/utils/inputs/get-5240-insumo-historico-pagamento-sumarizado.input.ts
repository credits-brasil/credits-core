type Indicador = {
  $?: {
    nome?: string;
    valor?: string;
  };
  detalhes?:
    | {
        $?: {
          nome?: string;
          valor?: string;
        };
      }
    | {
        $?: {
          nome?: string;
          valor?: string;
        };
      }[];
};

type IndicadorOutput = {
  nome?: string;
  valor?: string;
};

type IndicadorComDetalhesOutput = {
  nome?: string;
  valor?: string;
  detalhes: {
    nome?: string;
    valor?: string;
  }[];
};

export const get5240InsumoHistoricoPagamentoSumarizadoInput =
  (insumoHistoricoPagamentoSumarizado: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };

    "detalhe-insumo-historico-pagamento-sumarizado"?: {
      $?: {
        "data-ultima-atualizacao"?: string;
      };

      "compromissos-ativos"?: {
        indicadores?: Indicador | Indicador[];
      };

      "contratos-ativos"?: {
        indicadores?: Indicador | Indicador[];
      };

      indicadores?: {
        $?: {
          "parcelas-aberto"?: string;
          "parcelas-pagas"?: string;
          "parcelas-vencer"?: string;
          "quantidade-compromissos"?: string;
          "quantidade-credores"?: string;
          "total-compromissos-final"?: string;
          "total-compromissos-inicial"?: string;
        };
      };

      "pontualidade-pagamento"?: {
        indicadores?: Indicador | Indicador[];
      };

      "pontualidade-pagamento-aberto-final"?: {
        $?: {
          nome?: string;
          valor?: string;
        };
      };

      "pontualidade-pagamento-aberto-inicial"?: {
        $?: {
          nome?: string;
          valor?: string;
        };
      };

      "vencimento-aberto"?: {
        indicadores?: Indicador | Indicador[];
      };

      "vencimento-aberto-final"?: {
        $?: {
          nome?: string;
          valor?: string;
        };
      };

      "vencimento-aberto-inicial"?: {
        $?: {
          nome?: string;
          valor?: string;
        };
      };
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };

    "detalhe-insumo-historico-pagamento-sumarizado": {
      "data-ultima-atualizacao"?: string;

      "compromissos-ativos": {
        indicadores: IndicadorOutput[];
      };

      "contratos-ativos": {
        indicadores: IndicadorComDetalhesOutput[];
      };

      indicadores: {
        "parcelas-aberto"?: string;
        "parcelas-pagas"?: string;
        "parcelas-vencer"?: string;
        "quantidade-compromissos"?: string;
        "quantidade-credores"?: string;
        "total-compromissos-final"?: string;
        "total-compromissos-inicial"?: string;
      };

      "pontualidade-pagamento": {
        indicadores: IndicadorComDetalhesOutput[];
      };

      "pontualidade-pagamento-aberto-final": IndicadorOutput;

      "pontualidade-pagamento-aberto-inicial": IndicadorOutput;

      "vencimento-aberto": {
        indicadores: IndicadorComDetalhesOutput[];
      };

      "vencimento-aberto-final": IndicadorOutput;

      "vencimento-aberto-inicial": IndicadorOutput;
    };
  } => {
    const detalhe =
      insumoHistoricoPagamentoSumarizado?.[
        "detalhe-insumo-historico-pagamento-sumarizado"
      ];

    const normalizeArray = <T>(value?: T | T[]) => {
      if (!value) return [];

      return Array.isArray(value) ? value : [value];
    };

    const mapIndicadores = (
      indicadores?: Indicador | Indicador[],
    ): IndicadorOutput[] => {
      return normalizeArray(indicadores).map((i) => ({
        nome: i.$?.nome,
        valor: i.$?.valor,
      }));
    };

    const mapIndicadoresComDetalhes = (
      indicadores?: Indicador | Indicador[],
    ): IndicadorComDetalhesOutput[] => {
      return normalizeArray(indicadores).map((i) => ({
        nome: i.$?.nome,
        valor: i.$?.valor,

        detalhes: normalizeArray(i.detalhes).map((d) => ({
          nome: d.$?.nome,
          valor: d.$?.valor,
        })),
      }));
    };

    return {
      resumo: {
        "quantidade-total":
          insumoHistoricoPagamentoSumarizado?.resumo?.$?.["quantidade-total"],
      },

      "detalhe-insumo-historico-pagamento-sumarizado": {
        "data-ultima-atualizacao": detalhe?.$?.["data-ultima-atualizacao"],

        "compromissos-ativos": {
          indicadores: mapIndicadores(
            detalhe?.["compromissos-ativos"]?.indicadores,
          ),
        },

        "contratos-ativos": {
          indicadores: mapIndicadoresComDetalhes(
            detalhe?.["contratos-ativos"]?.indicadores,
          ),
        },

        indicadores: {
          "parcelas-aberto": detalhe?.indicadores?.$?.["parcelas-aberto"],

          "parcelas-pagas": detalhe?.indicadores?.$?.["parcelas-pagas"],

          "parcelas-vencer": detalhe?.indicadores?.$?.["parcelas-vencer"],

          "quantidade-compromissos":
            detalhe?.indicadores?.$?.["quantidade-compromissos"],

          "quantidade-credores":
            detalhe?.indicadores?.$?.["quantidade-credores"],

          "total-compromissos-final":
            detalhe?.indicadores?.$?.["total-compromissos-final"],

          "total-compromissos-inicial":
            detalhe?.indicadores?.$?.["total-compromissos-inicial"],
        },

        "pontualidade-pagamento": {
          indicadores: mapIndicadoresComDetalhes(
            detalhe?.["pontualidade-pagamento"]?.indicadores,
          ),
        },

        "pontualidade-pagamento-aberto-final": {
          nome: detalhe?.["pontualidade-pagamento-aberto-final"]?.$?.nome,
          valor: detalhe?.["pontualidade-pagamento-aberto-final"]?.$?.valor,
        },

        "pontualidade-pagamento-aberto-inicial": {
          nome: detalhe?.["pontualidade-pagamento-aberto-inicial"]?.$?.nome,
          valor: detalhe?.["pontualidade-pagamento-aberto-inicial"]?.$?.valor,
        },

        "vencimento-aberto": {
          indicadores: mapIndicadoresComDetalhes(
            detalhe?.["vencimento-aberto"]?.indicadores,
          ),
        },

        "vencimento-aberto-final": {
          nome: detalhe?.["vencimento-aberto-final"]?.$?.nome,
          valor: detalhe?.["vencimento-aberto-final"]?.$?.valor,
        },

        "vencimento-aberto-inicial": {
          nome: detalhe?.["vencimento-aberto-inicial"]?.$?.nome,
          valor: detalhe?.["vencimento-aberto-inicial"]?.$?.valor,
        },
      },
    };
  };
