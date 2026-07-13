export const get5228ScoreCadastroPositivoInput = (scoreCadastroPositivo: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => scoreCadastroPositivo.resumo.$["quantidade-total"];
