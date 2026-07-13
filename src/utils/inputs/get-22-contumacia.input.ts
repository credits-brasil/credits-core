export const get22ContumaciaInput = (contumacia: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => contumacia.resumo.$["quantidade-total"];
