export const get5266AnaliseDocumentosSPCInput = (analiseDocumentosSPC: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => analiseDocumentosSPC.resumo.$["quantidade-total"];
