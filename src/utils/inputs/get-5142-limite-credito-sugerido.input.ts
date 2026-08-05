export const get5142LimiteCreditoSugeridoInput = (limiteCreditoSugerido: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-limite-credito-sugerido"?:
    | {
        $?: {
          "limite-sugerido"?: string;
        };
      }
    | {
        $?: {
          "limite-sugerido"?: string;
        };
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
    "valor-total"?: string;
  };
  "detalhe-limite-credito-sugerido": {
    "limite-sugerido"?: string;
  }[];
} => {
  const detalhes = limiteCreditoSugerido?.["detalhe-limite-credito-sugerido"];

  const lista = Array.isArray(detalhes) ? detalhes : detalhes ? [detalhes] : [];

  return {
    resumo: {
      "quantidade-total":
        limiteCreditoSugerido?.resumo?.$?.["quantidade-total"],
      "valor-total": limiteCreditoSugerido?.resumo?.$?.["valor-total"],
    },
    "detalhe-limite-credito-sugerido": lista.map((item) => ({
      "limite-sugerido": item.$?.["limite-sugerido"],
    })),
  };
};
