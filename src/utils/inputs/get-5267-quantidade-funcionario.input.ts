export const get5267QuantidadeFuncionarioInput = (quantidadeFuncionario: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };

  "detalhe-quantidade-funcionario"?: {
    qtdeFuncionario?: string;
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };

  "detalhe-quantidade-funcionario": {
    qtdeFuncionario?: string;
  };
} => {
  const detalhe = quantidadeFuncionario?.["detalhe-quantidade-funcionario"];

  return {
    resumo: {
      "quantidade-total":
        quantidadeFuncionario?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-quantidade-funcionario": {
      qtdeFuncionario: detalhe?.qtdeFuncionario,
    },
  };
};
