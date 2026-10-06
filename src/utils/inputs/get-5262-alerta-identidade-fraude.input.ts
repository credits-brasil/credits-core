export const get5262AlertaIdentidadeFraudeInput = (alertaIdentidadeFraude: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-alerta-identidade-fraude"?:
    | {
        "alerta-fraude"?: string;
      }
    | {
        "alerta-fraude"?: string;
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-alerta-identidade-fraude": {
    "alerta-fraude"?: string;
  }[];
} => ({
  resumo: {
    "quantidade-total": alertaIdentidadeFraude?.resumo?.$?.["quantidade-total"],
  },
  "detalhe-alerta-identidade-fraude": (() => {
    const detalhes =
      alertaIdentidadeFraude?.["detalhe-alerta-identidade-fraude"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((item) => ({
      "alerta-fraude": item["alerta-fraude"],
    }));
  })(),
});
