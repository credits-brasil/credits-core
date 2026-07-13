export const get19AlertaDocumentoInput = (alertaDocumento: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => alertaDocumento.resumo.$["quantidade-total"];
