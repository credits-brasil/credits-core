export const get23SocioInput = (socio: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-socio"?:
    | {
        $?: {
          "cargo-administracao"?: string;
          documento?: string;
          nome?: string;
          "porcentual-participacao"?: string;
          "tipo-relacionamento"?: string;
        };
      }
    | {
        $?: {
          "cargo-administracao"?: string;
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
  "detalhe-socio": {
    "cargo-administracao"?: string;
    documento?: string;
    nome?: string;
    "porcentual-participacao"?: string;
    "tipo-relacionamento"?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": socio?.resumo?.$?.["quantidade-total"],
  },

  "detalhe-socio": (() => {
    const detalhes = socio?.["detalhe-socio"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      "cargo-administracao": i.$?.["cargo-administracao"],
      documento: i.$?.documento,
      nome: i.$?.nome,
      "porcentual-participacao": i.$?.["porcentual-participacao"],
      "tipo-relacionamento": i.$?.["tipo-relacionamento"],
    }));
  })(),
});
