export const get10UltimoTelefoneInformadoInput = (ultimoTelefoneInformado: {
  "detalhe-ultimo-telefone-informado"?: {
    $?: {
      "data-primeira-consulta"?: string;
      "data-ultima-consulta"?: string;
      "quantidade-consulta"?: string;
    };
    telefone?: {
      $?: {
        "numero-ddd"?: string;
        numero?: string;
      };
    };
  }[];
}): {
  "detalhe-ultimo-telefone-informado": {
    "data-primeira-consulta"?: string;
    "data-ultima-consulta"?: string;
    "quantidade-consulta"?: string;
    telefone: string;
  }[];
} => ({
  "detalhe-ultimo-telefone-informado":
    ultimoTelefoneInformado?.["detalhe-ultimo-telefone-informado"]?.map(
      (i) => ({
        "data-primeira-consulta": i.$?.["data-primeira-consulta"],
        "data-ultima-consulta": i.$?.["data-ultima-consulta"],
        "quantidade-consulta": i.$?.["quantidade-consulta"],
        telefone: `${
          i.telefone?.$?.["numero-ddd"] ?? ""
        } ${i.telefone?.$?.numero ?? ""}`.trim(),
      }),
    ) ?? [],
});
