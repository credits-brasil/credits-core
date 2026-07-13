interface RendaPresumidaSPC {
  resumo: {
    $: {
      "quantidade-total": string;
      "valor-total": string;
    };
  };
  "detalhe-renda-presumida-spc": {
    $: {
      mediana: string;
    };
  };
}

export interface Get5122RendaPresumidaSPCOutput {
  resumo: {
    "quantidade-total": string;
    "valor-total": string;
  };
  detalhe: {
    mediana: string;
  };
}

export const get5122RendaPresumidaSPCInput = (
  rendaPresumidaSPC: RendaPresumidaSPC,
): Get5122RendaPresumidaSPCOutput => ({
  resumo: {
    "quantidade-total":
      rendaPresumidaSPC.resumo.$["quantidade-total"],
    "valor-total":
      rendaPresumidaSPC.resumo.$["valor-total"],
  },
  detalhe: {
    mediana:
      rendaPresumidaSPC?.["detalhe-renda-presumida-spc"]?.$?.mediana,
  },
});