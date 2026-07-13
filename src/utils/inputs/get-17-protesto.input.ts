export const get17ProtestoInput = (protesto: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-primeira-ocorrencia"?: string;
      "data-ultima-ocorrencia"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-protesto"?: {
    $?: {
      "data-protesto"?: string;
      valor?: string;
    };
    cartorio?: {
      $?: {
        nome?: string;
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
    };
  }[];
}): {
  resumo: {
    "quantidade-total"?: string;
    "data-primeira-ocorrencia"?: string;
    "data-ultima-ocorrencia"?: string;
    "valor-total"?: string;
  };
  "detalhe-protesto": {
    "data-protesto"?: string;
    valor?: string;
    cartorio?: string;
    cidade?: string;
    estado?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": protesto?.resumo?.$?.["quantidade-total"],
    "data-primeira-ocorrencia":
      protesto?.resumo?.$?.["data-primeira-ocorrencia"],
    "data-ultima-ocorrencia": protesto?.resumo?.$?.["data-ultima-ocorrencia"],
    "valor-total": protesto?.resumo?.$?.["valor-total"],
  },

  "detalhe-protesto":
    protesto?.["detalhe-protesto"]?.map((i) => ({
      "data-protesto": i.$?.["data-protesto"],
      valor: i.$?.valor,
      cartorio: i.cartorio?.$?.nome,
      cidade: i.cartorio?.cidade?.$?.nome,
      estado: i.cartorio?.cidade?.estado?.$?.["sigla-uf"],
    })) ?? [],
});
