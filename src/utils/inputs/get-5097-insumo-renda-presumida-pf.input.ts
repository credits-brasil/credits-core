interface InsumoRendaPresumidaPFSPC {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "valor-total"?: string;
    };
  };
  ["detalhe-insumo-renda-presumida-pf"]?: {
    $?: {
      "valor-renda-maxima"?: string;
      "valor-renda-mediana"?: string;
      "valor-renda-minima"?: string;
      "valor-renda-plus-cartao"?: string;
      "valor-renda-plus-parcelado"?: string;
    };
  };
}

export interface Get5097RendaPresumidaPFOutput {
  resumo: {
    "quantidade-total"?: string;
    "valor-total"?: string;
  };
  detalhe: {
    "valor-renda-maxima"?: string;
    "valor-renda-mediana"?: string;
    "valor-renda-minima"?: string;
    "valor-renda-plus-cartao"?: string;
    "valor-renda-plus-parcelado"?: string;
  };
}

export const get5097RendaPresumidaPFInput = (
  rendaPresumidaPF: InsumoRendaPresumidaPFSPC,
): Get5097RendaPresumidaPFOutput => ({
  resumo: {
    "quantidade-total": rendaPresumidaPF?.resumo?.$?.["quantidade-total"],
    "valor-total": rendaPresumidaPF?.resumo?.$?.["valor-total"],
  },
  detalhe: {
    "valor-renda-maxima":
      rendaPresumidaPF?.["detalhe-insumo-renda-presumida-pf"]?.$?.[
        "valor-renda-maxima"
      ],
    "valor-renda-mediana":
      rendaPresumidaPF?.["detalhe-insumo-renda-presumida-pf"]?.$?.[
        "valor-renda-mediana"
      ],
    "valor-renda-minima":
      rendaPresumidaPF?.["detalhe-insumo-renda-presumida-pf"]?.$?.[
        "valor-renda-minima"
      ],
    "valor-renda-plus-cartao":
      rendaPresumidaPF?.["detalhe-insumo-renda-presumida-pf"]?.$?.[
        "valor-renda-plus-cartao"
      ],
    "valor-renda-plus-parcelado":
      rendaPresumidaPF?.["detalhe-insumo-renda-presumida-pf"]?.$?.[
        "valor-renda-plus-parcelado"
      ],
  },
});
