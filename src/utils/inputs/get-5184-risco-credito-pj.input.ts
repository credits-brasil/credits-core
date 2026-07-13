export const get5184RiscoCreditoPJInput = (riscoCreditoPJ: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-risco-credito-pj"?: {
    probabilidadeInadimplencia?: string;
    mensagemRetorno?: string;
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-risco-credito-pj": {
    probabilidadeInadimplencia?: string;
    mensagemRetorno?: string;
  };
} => ({
  resumo: {
    "quantidade-total": riscoCreditoPJ?.resumo?.$?.["quantidade-total"],
  },
  "detalhe-risco-credito-pj": {
    probabilidadeInadimplencia:
      riscoCreditoPJ?.["detalhe-risco-credito-pj"]?.probabilidadeInadimplencia,
    mensagemRetorno:
      riscoCreditoPJ?.["detalhe-risco-credito-pj"]?.mensagemRetorno,
  },
});
