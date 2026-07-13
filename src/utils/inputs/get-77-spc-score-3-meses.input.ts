export const get77SPCScore3MesesInput = (spcScore3Meses: {
  "detalhe-spc-score-3-meses"?: {
    $?: {
      classe?: string;
      horizonte?: string;
      "mesagem-interpretativa-score"?: string;
      score?: string;
    };
  };
}): {
  "detalhe-spc-score-3-meses": {
    classe?: string;
    horizonte?: string;
    "mesagem-interpretativa-score"?: string;
    score?: string;
  };
} => {
  const detalhe = spcScore3Meses?.["detalhe-spc-score-3-meses"];

  return {
    "detalhe-spc-score-3-meses": {
      classe: detalhe?.$?.classe,
      horizonte: detalhe?.$?.horizonte,
      "mesagem-interpretativa-score":
        detalhe?.$?.["mesagem-interpretativa-score"],
      score: detalhe?.$?.score,
    },
  };
};
