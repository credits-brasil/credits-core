export const get5261ScoreAgroInput = (scoreAgro: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };

  "detalhe-score-agro"?: {
    $?: {
      probabilidade?: string;
      score?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };

  "detalhe-score-agro": {
    probabilidade?: string;
    score?: string;
  };
} => {
  const detalhe = scoreAgro?.["detalhe-score-agro"];

  return {
    resumo: {
      "quantidade-total": scoreAgro?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-score-agro": {
      probabilidade: detalhe?.$?.probabilidade,

      score: detalhe?.$?.score,
    },
  };
};
