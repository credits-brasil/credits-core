type SPCScore12MesesItem = {
  $?: {
    classe?: string;
    horizonte?: string;
    "mesagem-interpretativa-score"?: string;
    score?: string;
  };
};

export const get78SPCScore12MesesInput = (
  spcScore12Meses: {
    "detalhe-spc-score-12-meses"?: SPCScore12MesesItem | SPCScore12MesesItem[];
  },
): {
  "detalhe-spc-score-12-meses": {
    classe?: string;
    horizonte?: string;
    "mesagem-interpretativa-score"?: string;
    score?: string;
  }[];
} => {
  const detalhes = spcScore12Meses?.["detalhe-spc-score-12-meses"];

  const lista = Array.isArray(detalhes)
    ? detalhes
    : detalhes
      ? [detalhes]
      : [];

  return {
    "detalhe-spc-score-12-meses": lista.map((item) => ({
      classe: item.$?.classe,
      horizonte: item.$?.horizonte,
      "mesagem-interpretativa-score":
        item.$?.["mesagem-interpretativa-score"],
      score: item.$?.score,
    })),
  };
};