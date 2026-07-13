export const get5268ValidaCelularInput = (validaCelular: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => validaCelular.resumo.$["quantidade-total"];
