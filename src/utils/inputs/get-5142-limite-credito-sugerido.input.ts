export const get5142LimiteCreditoSugeridoInput = (limiteCreditoSugerido: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => limiteCreditoSugerido.resumo.$["quantidade-total"];
