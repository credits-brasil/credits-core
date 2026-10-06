type DetalheParticipacaoEmpresa = {
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
};

export const get24ParticipacaoEmpresaInput = (participacaoEmpresa: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };

  "detalhe-participacao-empresa"?:
    | DetalheParticipacaoEmpresa
    | DetalheParticipacaoEmpresa[];
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
  const detalhes = participacaoEmpresa?.["detalhe-participacao-empresa"];
  const lista = Array.isArray(detalhes)
    ? detalhes
    : detalhes
      ? [detalhes]
      : [];

  return {
    resumo: {
      "quantidade-total": participacaoEmpresa?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-participacao-empresa": lista.map((item) => ({
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
