export const get55PendenciaFinanceiraInput = (pendenciaFinanceira: {
  $?: {
    "ocorrencia-mais-antiga-chequenet"?: string;
    "ocorrencia-mais-recente-chequenet"?: string;
  };
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-ultima-ocorrencia"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-pendencia-financeira"?:
    | {
        $?: {
          avalista?: string;
          contrato?: string;
          "data-ocorrencia"?: string;
          origem?: string;
          "titulo-ocorrencia"?: string;
          "valor-pendencia"?: string;
        };
        moeda?: {
          $?: {
            simbolo?: string;
          };
        };
        cidade?: {
          $?: {
            nome?: string;
          };
          estado?: {
            $?: {
              "sigla-uf"?: string;
            };
          };
        };
      }
    | {
        $?: {
          avalista?: string;
          contrato?: string;
          "data-ocorrencia"?: string;
          origem?: string;
          "titulo-ocorrencia"?: string;
          "valor-pendencia"?: string;
        };
        moeda?: {
          $?: {
            simbolo?: string;
          };
        };
        cidade?: {
          $?: {
            nome?: string;
          };
          estado?: {
            $?: {
              "sigla-uf"?: string;
            };
          };
        };
      }[];
}): {
  "ocorrencia-mais-antiga-chequenet"?: string;
  "ocorrencia-mais-recente-chequenet"?: string;
  resumo: {
    "quantidade-total"?: string;
    "data-ultima-ocorrencia"?: string;
    "valor-total"?: string;
  };
  "detalhe-pendencia-financeira": {
    avalista?: string;
    contrato?: string;
    "data-ocorrencia"?: string;
    origem?: string;
    "titulo-ocorrencia"?: string;
    "valor-pendencia"?: string;
    cidade?: string;
    estado?: string;
  }[];
} => ({
  "ocorrencia-mais-antiga-chequenet":
    pendenciaFinanceira?.$?.["ocorrencia-mais-antiga-chequenet"],

  "ocorrencia-mais-recente-chequenet":
    pendenciaFinanceira?.$?.["ocorrencia-mais-recente-chequenet"],

  resumo: {
    "quantidade-total": pendenciaFinanceira?.resumo?.$?.["quantidade-total"],
    "data-ultima-ocorrencia":
      pendenciaFinanceira?.resumo?.$?.["data-ultima-ocorrencia"],
    "valor-total": pendenciaFinanceira?.resumo?.$?.["valor-total"],
  },

  "detalhe-pendencia-financeira": (() => {
    const detalhes = pendenciaFinanceira?.["detalhe-pendencia-financeira"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      avalista: i.$?.avalista,
      contrato: i.$?.contrato,
      "data-ocorrencia": i.$?.["data-ocorrencia"],
      origem: i.$?.origem,
      "titulo-ocorrencia": i.$?.["titulo-ocorrencia"],
      "valor-pendencia": i.$?.["valor-pendencia"],
      cidade: i.cidade?.$?.nome,
      estado: i.cidade?.estado?.$?.["sigla-uf"],
    }));
  })(),
});
