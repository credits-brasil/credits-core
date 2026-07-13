export const get3TelefoneConsultadoInput = (telefoneConsultado: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => telefoneConsultado.resumo.$["quantidade-total"];
