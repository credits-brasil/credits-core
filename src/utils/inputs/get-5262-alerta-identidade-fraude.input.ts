export const get5262AlertaIdentidadeFraudeInput = (alertaIdentidadeFraude: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => alertaIdentidadeFraude.resumo.$["quantidade-total"];
