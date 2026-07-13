export const get69ChequeSemFundoVarejoInput = (chequeSemFundoVarejo: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => chequeSemFundoVarejo.resumo.$["quantidade-total"];
