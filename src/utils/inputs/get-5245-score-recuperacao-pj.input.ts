export const get5245ScoreRecuperacaoPJInput = (scoreRecuperacaoPJ: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-score-recuperacao-pj"?: {
    $?: {
      score?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-score-recuperacao-pj": {
    score?: string;
  };
} => ({
  resumo: {
    "quantidade-total": scoreRecuperacaoPJ?.resumo?.$?.["quantidade-total"],
  },
  "detalhe-score-recuperacao-pj": {
    score: scoreRecuperacaoPJ?.["detalhe-score-recuperacao-pj"]?.$?.score,
  },
});
