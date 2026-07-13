export const get5194ComprometimentoRendaMensalPfInput =
  (comprometimentoRendaMensalPf: {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  }) => comprometimentoRendaMensalPf.resumo.$["quantidade-total"];
