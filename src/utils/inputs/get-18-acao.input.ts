export const get18AcaoInput = (acao: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-primeira-ocorrencia"?: string;
      "data-ultima-ocorrencia"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-acao"?:
    | {
        $?: {
          "data-acao"?: string;
          "valor-acao"?: string;
        };
        vara?: {
          $?: {
            nome?: string;
          };
          comarca?: {
            $?: {
              nome?: string;
            };
            estado?: {
              $?: {
                "sigla-uf"?: string;
              };
            };
          };
        };
        "tipo-acao"?: {
          $?: {
            descricao?: string;
          };
        };
      }
    | {
        $?: {
          "data-acao"?: string;
          "valor-acao"?: string;
        };
        vara?: {
          $?: {
            nome?: string;
          };
          comarca?: {
            $?: {
              nome?: string;
            };
            estado?: {
              $?: {
                "sigla-uf"?: string;
              };
            };
          };
        };
        "tipo-acao"?: {
          $?: {
            descricao?: string;
          };
        };
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
    "data-primeira-ocorrencia"?: string;
    "data-ultima-ocorrencia"?: string;
    "valor-total"?: string;
  };
  "detalhe-acao": {
    "data-acao"?: string;
    "valor-acao"?: string;
    vara?: string;
    comarca?: string;
    estado?: string;
    "tipo-acao"?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": acao?.resumo?.$?.["quantidade-total"],
    "data-primeira-ocorrencia": acao?.resumo?.$?.["data-primeira-ocorrencia"],
    "data-ultima-ocorrencia": acao?.resumo?.$?.["data-ultima-ocorrencia"],
    "valor-total": acao?.resumo?.$?.["valor-total"],
  },

  "detalhe-acao": (() => {
    const detalhes = acao?.["detalhe-acao"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      "data-acao": i.$?.["data-acao"],
      "valor-acao": i.$?.["valor-acao"],
      vara: i.vara?.$?.nome,
      comarca: i.vara?.comarca?.$?.nome,
      estado: i.vara?.comarca?.estado?.$?.["sigla-uf"],
      "tipo-acao": i["tipo-acao"]?.$?.descricao,
    }));
  })(),
});
