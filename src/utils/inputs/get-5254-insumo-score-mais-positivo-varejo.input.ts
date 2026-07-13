interface InsumoScoreMaisPositivoVarejoSPC {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-insumo-score-mais-positivo-varejo"?: {
    $?: {
      score?: string;
      "probabilidade-inadimplencia"?: string;
      "indice-risco-credito-score-mais-positivo-varejo"?: string;
    };
  };
}

export interface Get5254ScoreMaisPositivoVarejoOutput {
  resumo: {
    "quantidade-total"?: string;
  };
  detalhe: {
    score?: string;
    "probabilidade-inadimplencia"?: string;
    "indice-risco-credito-score-mais-positivo-varejo"?: string;
  };
}

export const get5254ScoreMaisPositivoVarejoInput = (scoreMaisPositivoVarejo: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-insumo-score-mais-positivo-varejo"?: {
    $?: {
      score?: string;
      "probabilidade-inadimplencia"?: string;
      "indice-risco-credito-score-mais-positivo-varejo"?: string;
    };
  };
}): Get5254ScoreMaisPositivoVarejoOutput => ({
  resumo: {
    "quantidade-total":
      scoreMaisPositivoVarejo?.resumo?.$?.["quantidade-total"],
  },
  detalhe: {
    score:
      scoreMaisPositivoVarejo?.["detalhe-insumo-score-mais-positivo-varejo"]?.$
        ?.score,
    "probabilidade-inadimplencia":
      scoreMaisPositivoVarejo?.["detalhe-insumo-score-mais-positivo-varejo"]
        ?.$?.["probabilidade-inadimplencia"],
    "indice-risco-credito-score-mais-positivo-varejo":
      scoreMaisPositivoVarejo?.["detalhe-insumo-score-mais-positivo-varejo"]
        ?.$?.["indice-risco-credito-score-mais-positivo-varejo"],
  },
});
