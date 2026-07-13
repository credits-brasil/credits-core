export const get5263InscricaoEstadualInput = (inscricaoEstadual: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-inscricao-estadual"?:
    | {
        "mensagem-interpretativa"?: string;
      }
    | {
        "mensagem-interpretativa"?: string;
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-inscricao-estadual": {
    "mensagem-interpretativa"?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": inscricaoEstadual?.resumo?.$?.["quantidade-total"],
  },

  "detalhe-inscricao-estadual": (() => {
    const detalhes = inscricaoEstadual?.["detalhe-inscricao-estadual"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      "mensagem-interpretativa": i["mensagem-interpretativa"],
    }));
  })(),
});
