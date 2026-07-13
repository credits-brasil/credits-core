export const get78SPCScore12MesesInput = (spcScore12Meses: {
  "detalhe-spc-score-12-meses"?:
    | {
        $?: {
          classe?: string;
          horizonte?: string;
          "mesagem-interpretativa-score"?: string;
          score?: string;
        };
      }
    | {
        $?: {
          classe?: string;
          horizonte?: string;
          "mesagem-interpretativa-score"?: string;
          score?: string;
        };
      }[];
}): {
  "detalhe-spc-score-12-meses": {
    classe?: string;
    horizonte?: string;
    "mesagem-interpretativa-score"?: string;
    score?: string;
  }[];
} => ({
  "detalhe-spc-score-12-meses": (() => {
    const detalhes = spcScore12Meses?.["detalhe-spc-score-12-meses"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      classe: i.$?.classe,
      horizonte: i.$?.horizonte,
      "mesagem-interpretativa-score": i.$?.["mesagem-interpretativa-score"],
      score: i.$?.score,
    }));
  })(),
});
