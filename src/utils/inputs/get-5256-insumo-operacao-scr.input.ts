export const get5256InsumoOperacaoSCRInput = (insumoOperacaoSCR: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-insumo-operacao-scr"?:
    | {
        $?: {
          quantidade?: string;
          "data-inicio-relacionamento"?: string;
          "valor-total-contratado-inicial"?: string;
          "valor-total-contratado-final"?: string;
          "quantidade-instituicao-scr"?: string;
        };
      }
    | {
        $?: {
          quantidade?: string;
          "data-inicio-relacionamento"?: string;
          "valor-total-contratado-inicial"?: string;
          "valor-total-contratado-final"?: string;
          "quantidade-instituicao-scr"?: string;
        };
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-insumo-operacao-scr": {
    quantidade?: string;
    "data-inicio-relacionamento"?: string;
    "valor-total-contratado-inicial"?: string;
    "valor-total-contratado-final"?: string;
    "quantidade-instituicao-scr"?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": insumoOperacaoSCR?.resumo?.$?.["quantidade-total"],
  },

  "detalhe-insumo-operacao-scr": (() => {
    const detalhes = insumoOperacaoSCR?.["detalhe-insumo-operacao-scr"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((i) => ({
      quantidade: i.$?.quantidade,
      "data-inicio-relacionamento": i.$?.["data-inicio-relacionamento"],
      "valor-total-contratado-inicial": i.$?.["valor-total-contratado-inicial"],
      "valor-total-contratado-final": i.$?.["valor-total-contratado-final"],
      "quantidade-instituicao-scr": i.$?.["quantidade-instituicao-scr"],
    }));
  })(),
});
