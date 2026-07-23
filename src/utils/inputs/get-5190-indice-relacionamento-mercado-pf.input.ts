export const get5190IndiceRelacionamentoMercadoPfInput =
  (indiceRelacionamentoMercadoPf: {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  }) => indiceRelacionamentoMercadoPf.resumo.$["quantidade-total"];
