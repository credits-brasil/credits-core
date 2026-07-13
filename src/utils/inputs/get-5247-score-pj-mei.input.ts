export const get5247ScorePJMEIInput = (scorePjMei: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };

  "detalhe-score-pj-mei"?: {
    $?: {
      classe?: string;
      horizonte?: string;
      "mesagem-interpretativa-score"?: string;
      score?: string;
      "tipo-cliente-score"?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };

  "detalhe-score-pj-mei": {
    classe?: string;
    horizonte?: string;
    "mesagem-interpretativa-score"?: string;
    score?: string;
    "tipo-cliente-score"?: string;
  };
} => {
  const detalhe = scorePjMei?.["detalhe-score-pj-mei"];

  return {
    resumo: {
      "quantidade-total": scorePjMei?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-score-pj-mei": {
      classe: detalhe?.$?.classe,
      horizonte: detalhe?.$?.horizonte,
      "mesagem-interpretativa-score":
        detalhe?.$?.["mesagem-interpretativa-score"],
      score: detalhe?.$?.score,
      "tipo-cliente-score": detalhe?.$?.["tipo-cliente-score"],
    },
  };
};
