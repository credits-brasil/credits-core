interface InsumoScoreMaisPositivoFinanceiroSPC {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  ["detalhe-insumo-score-mais-positivo-financeiro"]?: {
    $?: {
      score?: string;
      "probabilidade-inadimplencia"?: string;
      "indice-risco-credito-score-mais-positivo-financeiro"?: string;
    };
  };
}

export interface Get5253ScoreMaisPositivoFinanceiroOutput {
  resumo: {
    "quantidade-total"?: string;
  };
  detalhe: {
    score?: string;
    "probabilidade-inadimplencia"?: string;
    "indice-risco-credito-score-mais-positivo-financeiro"?: string;
  };
}

export const get5253ScoreMaisPositivoFinanceiroInput = (
  scoreMaisPositivoFinanceiro: InsumoScoreMaisPositivoFinanceiroSPC,
): Get5253ScoreMaisPositivoFinanceiroOutput => ({
  resumo: {
    "quantidade-total":
      scoreMaisPositivoFinanceiro?.resumo?.$?.["quantidade-total"],
  },
  detalhe: {
    score:
      scoreMaisPositivoFinanceiro?.[
        "detalhe-insumo-score-mais-positivo-financeiro"
      ]?.$?.score,
    "probabilidade-inadimplencia":
      scoreMaisPositivoFinanceiro?.[
        "detalhe-insumo-score-mais-positivo-financeiro"
      ]?.$?.["probabilidade-inadimplencia"],
    "indice-risco-credito-score-mais-positivo-financeiro":
      scoreMaisPositivoFinanceiro?.[
        "detalhe-insumo-score-mais-positivo-financeiro"
      ]?.$?.["indice-risco-credito-score-mais-positivo-financeiro"],
  },
});
