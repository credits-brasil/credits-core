export const get5258ParticipacaoEmpresaInput = (participacaoEmpresa: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };

  "detalhe-participacao-empresa"?: {
    $?: {
      "indicador-restricao"?: string;
      "cargo-direcao"?: string;
      "data-entrada"?: string;
      documento?: string;
      nome?: string;
      "porcentual-participacao"?: string;
      "situacao-documento"?: string;
      "tipo-relacionamento"?: string;
    };
  }[];
}): {
  resumo: {
    "quantidade-total"?: string;
  };

  "detalhe-participacao-empresa": {
    "indicador-restricao"?: string;
    "cargo-direcao"?: string;
    "data-entrada"?: string;
    documento?: string;
    nome?: string;
    "porcentual-participacao"?: string;
    "situacao-documento"?: string;
    "tipo-relacionamento"?: string;
  }[];
} => {
  const detalhes = participacaoEmpresa?.["detalhe-participacao-empresa"] ?? [];

  return {
    resumo: {
      "quantidade-total": participacaoEmpresa?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-participacao-empresa": detalhes.map((item) => ({
      "indicador-restricao": item.$?.["indicador-restricao"],

      "cargo-direcao": item.$?.["cargo-direcao"],

      "data-entrada": item.$?.["data-entrada"],

      documento: item.$?.documento,

      nome: item.$?.nome,

      "porcentual-participacao": item.$?.["porcentual-participacao"],

      "situacao-documento": item.$?.["situacao-documento"],

      "tipo-relacionamento": item.$?.["tipo-relacionamento"],
    })),
  };
};
