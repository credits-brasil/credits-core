export const get5180AlertaIdentidadeInput = (alertaIdentidade: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => alertaIdentidade.resumo.$["quantidade-total"];
