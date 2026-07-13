export const get5229ScorePJInput = (scorePJ: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-score-pj"?: {
    $?: {
      classe?: string;
      horizonte?: string;
      "mesagem-interpretativa-score"?: string;
      probabilidade?: string;
      score?: string;
      "tipo-cliente-score"?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-score-pj": {
    classe?: string;
    horizonte?: string;
    "mesagem-interpretativa-score"?: string;
    probabilidade?: string;
    score?: string;
    "tipo-cliente-score"?: string;
  };
} => ({
  resumo: {
    "quantidade-total": scorePJ?.resumo?.$?.["quantidade-total"],
  },
  "detalhe-score-pj": {
    classe: scorePJ?.["detalhe-score-pj"]?.$?.classe,
    horizonte: scorePJ?.["detalhe-score-pj"]?.$?.horizonte,
    "mesagem-interpretativa-score":
      scorePJ?.["detalhe-score-pj"]?.$?.["mesagem-interpretativa-score"],
    probabilidade: scorePJ?.["detalhe-score-pj"]?.$?.probabilidade,
    score: scorePJ?.["detalhe-score-pj"]?.$?.score,
    "tipo-cliente-score":
      scorePJ?.["detalhe-score-pj"]?.$?.["tipo-cliente-score"],
  },
});
