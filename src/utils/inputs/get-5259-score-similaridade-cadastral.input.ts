export const get5259ScoreSimilaridadeCadastralInput =
  (scoreSimilaridadeCadastral: {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  }) => scoreSimilaridadeCadastral.resumo.$["quantidade-total"];
