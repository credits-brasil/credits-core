export const get5257InsumoHistoricoOperacaoSCRInput =
  (insumoHistoricoOperacaoSCR: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-insumo-historico-operacao-scr"?: {
      $?: {
        quantidade?: string;
        "data-inicio-relacionamento"?: string;
        "valor-total-contratado-inicial"?: string;
        "valor-total-contratado-final"?: string;
        "quantidade-instituicao-scr"?: string;
        "vencimento-ultima-parcela"?: string;
        "quantidade-garantia"?: string;
        "valor-total-carteira-ativa-inicial"?: string;
        "valor-total-carteira-ativa-final"?: string;
        "valor-total-carteira-ativa-vencer-inicial"?: string;
        "valor-total-carteira-ativa-vencer-final"?: string;
        "data-atualizacao-base"?: string;
        score?: string;
        "indice-risco-credito-score"?: string;
        "probabilidade-inadimplencia"?: string;
        mensagem?: string;
      };
      "grupo-garantia"?:
        | {
            $?: {
              agrupamento?: string;
              percentual?: string;
            };
          }
        | {
            $?: {
              agrupamento?: string;
              percentual?: string;
            };
          }[];
      "grupo-modalidade"?:
        | {
            $?: {
              agrupamento?: string;
              percentual?: string;
            };
          }
        | {
            $?: {
              agrupamento?: string;
              percentual?: string;
            };
          }[];
      "grupo-carteira-ativa"?:
        | {
            $?: {
              agrupamento?: string;
              percentual?: string;
            };
          }
        | {
            $?: {
              agrupamento?: string;
              percentual?: string;
            };
          }[];
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };
    "detalhe-insumo-historico-operacao-scr": {
      quantidade?: string;
      "data-inicio-relacionamento"?: string;
      "valor-total-contratado-inicial"?: string;
      "valor-total-contratado-final"?: string;
      "quantidade-instituicao-scr"?: string;
      "vencimento-ultima-parcela"?: string;
      "quantidade-garantia"?: string;
      "valor-total-carteira-ativa-inicial"?: string;
      "valor-total-carteira-ativa-final"?: string;
      "valor-total-carteira-ativa-vencer-inicial"?: string;
      "valor-total-carteira-ativa-vencer-final"?: string;
      "data-atualizacao-base"?: string;
      score?: string;
      "indice-risco-credito-score"?: string;
      "probabilidade-inadimplencia"?: string;
      mensagem?: string;
      "grupo-garantia": {
        agrupamento?: string;
        percentual?: string;
      }[];
      "grupo-modalidade": {
        agrupamento?: string;
        percentual?: string;
      }[];
      "grupo-carteira-ativa": {
        agrupamento?: string;
        percentual?: string;
      }[];
    };
  } => ({
    resumo: {
      "quantidade-total":
        insumoHistoricoOperacaoSCR?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-insumo-historico-operacao-scr": {
      quantidade:
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]?.$
          ?.quantidade,

      "data-inicio-relacionamento":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["data-inicio-relacionamento"],

      "valor-total-contratado-inicial":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["valor-total-contratado-inicial"],

      "valor-total-contratado-final":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["valor-total-contratado-final"],

      "quantidade-instituicao-scr":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["quantidade-instituicao-scr"],

      "vencimento-ultima-parcela":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["vencimento-ultima-parcela"],

      "quantidade-garantia":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["quantidade-garantia"],

      "valor-total-carteira-ativa-inicial":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["valor-total-carteira-ativa-inicial"],

      "valor-total-carteira-ativa-final":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["valor-total-carteira-ativa-final"],

      "valor-total-carteira-ativa-vencer-inicial":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["valor-total-carteira-ativa-vencer-inicial"],

      "valor-total-carteira-ativa-vencer-final":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["valor-total-carteira-ativa-vencer-final"],

      "data-atualizacao-base":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["data-atualizacao-base"],

      score:
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]?.$
          ?.score,

      "indice-risco-credito-score":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["indice-risco-credito-score"],

      "probabilidade-inadimplencia":
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]
          ?.$?.["probabilidade-inadimplencia"],

      mensagem:
        insumoHistoricoOperacaoSCR?.["detalhe-insumo-historico-operacao-scr"]?.$
          ?.mensagem,

      "grupo-garantia": (() => {
        const grupos =
          insumoHistoricoOperacaoSCR?.[
            "detalhe-insumo-historico-operacao-scr"
          ]?.["grupo-garantia"];

        const lista = Array.isArray(grupos) ? grupos : grupos ? [grupos] : [];

        return lista.map((i) => ({
          agrupamento: i.$?.agrupamento,
          percentual: i.$?.percentual,
        }));
      })(),

      "grupo-modalidade": (() => {
        const grupos =
          insumoHistoricoOperacaoSCR?.[
            "detalhe-insumo-historico-operacao-scr"
          ]?.["grupo-modalidade"];

        const lista = Array.isArray(grupos) ? grupos : grupos ? [grupos] : [];

        return lista.map((i) => ({
          agrupamento: i.$?.agrupamento,
          percentual: i.$?.percentual,
        }));
      })(),

      "grupo-carteira-ativa": (() => {
        const grupos =
          insumoHistoricoOperacaoSCR?.[
            "detalhe-insumo-historico-operacao-scr"
          ]?.["grupo-carteira-ativa"];

        const lista = Array.isArray(grupos) ? grupos : grupos ? [grupos] : [];

        return lista.map((i) => ({
          agrupamento: i.$?.agrupamento,
          percentual: i.$?.percentual,
        }));
      })(),
    },
  });
