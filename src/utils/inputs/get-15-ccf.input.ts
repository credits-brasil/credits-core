export const get15CCFInput = (ccf: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => ccf.resumo.$["quantidade-total"];
