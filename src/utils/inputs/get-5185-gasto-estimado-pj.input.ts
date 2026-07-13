export const get5185GastoEstimadoPJInput = (gastoEstimadoPJ: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-gasto-estimado-pj"?: {
    valor?: string;
  };
}): {
  resumo: {
    "quantidade-total"?: string;
    "valor-total"?: string;
  };
  "detalhe-gasto-estimado-pj": {
    valor?: string;
  };
} => ({
  resumo: {
    "quantidade-total":
      gastoEstimadoPJ?.resumo?.$?.["quantidade-total"],
    "valor-total":
      gastoEstimadoPJ?.resumo?.$?.["valor-total"],
  },
  "detalhe-gasto-estimado-pj": {
    valor: gastoEstimadoPJ?.["detalhe-gasto-estimado-pj"]?.valor,
  },
});