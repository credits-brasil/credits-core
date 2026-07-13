export const get9ChequeLojistaInput = (chequeLojista: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => chequeLojista.resumo.$["quantidade-total"];
