export const get3082SPCObitoInput = (spcObito: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => spcObito.resumo.$["quantidade-total"];
