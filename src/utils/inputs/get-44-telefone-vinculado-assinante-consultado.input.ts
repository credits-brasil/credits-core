export const get44TelefoneVinculadoAssinanteConsultadoInput =
  (telefoneVinculadoAssinanteConsultado: {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  }) => telefoneVinculadoAssinanteConsultado.resumo.$["quantidade-total"];
