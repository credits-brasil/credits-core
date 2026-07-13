export const get67InformacaoPoderJudiciarioInput = (informacaoPoderJudiciario: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => informacaoPoderJudiciario.resumo.$["quantidade-total"];
