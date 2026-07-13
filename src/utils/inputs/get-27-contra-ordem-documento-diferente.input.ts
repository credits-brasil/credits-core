export const get27ContraOrdemDocumentoDiferenteInput =
  (contraOrdemDocumentoDiferente: {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  }) => contraOrdemDocumentoDiferente.resumo.$["quantidade-total"];
