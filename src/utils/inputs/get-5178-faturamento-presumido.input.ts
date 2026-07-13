export const get5178FaturamentoPresumidoInput = (faturamentoPresumido: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-faturamento-presumido"?: {
    $?: {
      "valor-faturamento"?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
    "valor-total"?: string;
  };
  "detalhe-faturamento-presumido": {
    "valor-faturamento"?: string;
  };
} => ({
  resumo: {
    "quantidade-total":
      faturamentoPresumido?.resumo?.$?.["quantidade-total"],
    "valor-total":
      faturamentoPresumido?.resumo?.$?.["valor-total"],
  },
  "detalhe-faturamento-presumido": {
    "valor-faturamento":
      faturamentoPresumido?.["detalhe-faturamento-presumido"]?.$?.[
        "valor-faturamento"
      ],
  },
});