export const get19AlertaDocumentoInput = (alertaDocumento: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-ultima-ocorrencia"?: string;
    };
  };
  "detalhe-alerta-documento"?:
    | {
        $?: {
          "data-inclusao"?: string;
          "data-ocorrencia"?: string;
          "entidade-origem"?: string;
          motivo?: string;
          observacao?: string;
        };
        "tipo-documento-alerta"?: {
          $?: {
            nome?: string;
          };
        };
      }
    | {
        $?: {
          "data-inclusao"?: string;
          "data-ocorrencia"?: string;
          "entidade-origem"?: string;
          motivo?: string;
          observacao?: string;
        };
        "tipo-documento-alerta"?: {
          $?: {
            nome?: string;
          };
        };
      }[];
}) => ({
  resumo: {
    "quantidade-total": alertaDocumento?.resumo?.$?.["quantidade-total"] ?? "0",
    "data-ultima-ocorrencia":
      alertaDocumento?.resumo?.$?.["data-ultima-ocorrencia"],
  },

  "detalhe-alerta-documento": (() => {
    const detalhes = alertaDocumento?.["detalhe-alerta-documento"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((item) => ({
      "data-inclusao": item.$?.["data-inclusao"],
      "data-ocorrencia": item.$?.["data-ocorrencia"],
      "entidade-origem": item.$?.["entidade-origem"],
      motivo: item.$?.motivo,
      observacao: item.$?.observacao,
      "tipo-documento-alerta": item["tipo-documento-alerta"]?.$?.nome,
    }));
  })(),
});
