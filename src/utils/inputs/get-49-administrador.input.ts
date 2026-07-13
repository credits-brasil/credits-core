export const get49AdministradorInput = (administrador: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-administrador"?:
    | {
        $?: {
          "cargo-administracao"?: string;
          "data-entrada"?: string;
          documento?: string;
          nome?: string;
          "porcentual-participacao"?: string;
          "tipo-relacionamento"?: string;
        };
      }
    | {
        $?: {
          "cargo-administracao"?: string;
          "data-entrada"?: string;
          documento?: string;
          nome?: string;
          "porcentual-participacao"?: string;
          "tipo-relacionamento"?: string;
        };
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-administrador": {
    "cargo-administracao"?: string;
    "data-entrada"?: string;
    documento?: string;
    nome?: string;
    "porcentual-participacao"?: string;
    "tipo-relacionamento"?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": administrador?.resumo?.$?.["quantidade-total"],
  },

  "detalhe-administrador": (() => {
    const detalhes = administrador?.["detalhe-administrador"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      "cargo-administracao": i.$?.["cargo-administracao"],
      "data-entrada": i.$?.["data-entrada"],
      documento: i.$?.documento,
      nome: i.$?.nome,
      "porcentual-participacao": i.$?.["porcentual-participacao"],
      "tipo-relacionamento": i.$?.["tipo-relacionamento"],
    }));
  })(),
});
