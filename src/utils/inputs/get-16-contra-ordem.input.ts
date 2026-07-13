export const get16ContraOrdemInput = (contraOrdem: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => contraOrdem.resumo.$["quantidade-total"];
