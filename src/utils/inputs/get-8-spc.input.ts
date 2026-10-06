export const get8SPCInput = (spc: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-ultima-ocorrencia"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-spc"?:
    | {
        $?: {
          "nome-associado"?: string;
          "data-inclusao"?: string;
          "data-vencimento"?: string;
          "nome-entidade"?: string;
          contrato?: string;
          "registro-instituicao-financeira"?: string;
          "comprador-fiador-avalista"?: string;
          valor?: string;
        };
        "telefone-associado"?: {
          $?: {
            "numero-ddd"?: string;
            numero?: string;
          };
        };
        "cidade-associado"?: {
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
          "nome-associado"?: string;
          "data-inclusao"?: string;
          "data-vencimento"?: string;
          "nome-entidade"?: string;
          contrato?: string;
          "registro-instituicao-financeira"?: string;
          "comprador-fiador-avalista"?: string;
          valor?: string;
        };
        "telefone-associado"?: {
          $?: {
            "numero-ddd"?: string;
            numero?: string;
          };
        };
        "cidade-associado"?: {
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
  resumo: {
    "quantidade-total"?: string;
    "data-ultima-ocorrencia"?: string;
    "valor-total"?: string;
  };
  "detalhe-spc": {
    "nome-associado"?: string;
    "data-inclusao"?: string;
    "data-vencimento"?: string;
    "nome-entidade"?: string;
    contrato?: string;
    "registro-instituicao-financeira"?: string;
    "comprador-fiador-avalista"?: string;
    valor?: string;
    "telefone-associado": string;
    "cidade-associado"?: string;
    estado?: string;
  }[];
} => {
  const detalhes = Array.isArray(spc?.["detalhe-spc"])
    ? spc["detalhe-spc"]
    : spc?.["detalhe-spc"]
      ? [spc["detalhe-spc"]]
      : [];

  return {
    resumo: {
      "quantidade-total": spc?.resumo?.$?.["quantidade-total"],
      "data-ultima-ocorrencia": spc?.resumo?.$?.["data-ultima-ocorrencia"],
      "valor-total": spc?.resumo?.$?.["valor-total"],
    },

    "detalhe-spc": detalhes.map((i) => ({
      "nome-associado": i.$?.["nome-associado"],
      "data-inclusao": i.$?.["data-inclusao"],
      "data-vencimento": i.$?.["data-vencimento"],
      "nome-entidade": i.$?.["nome-entidade"],
      contrato: i.$?.contrato,
      "registro-instituicao-financeira":
        i.$?.["registro-instituicao-financeira"],
      "comprador-fiador-avalista":
        i.$?.["comprador-fiador-avalista"],
      valor: i.$?.valor,
      "telefone-associado": `${
        i["telefone-associado"]?.$?.["numero-ddd"] ?? ""
      } ${i["telefone-associado"]?.$?.numero ?? ""}`.trim(),
      "cidade-associado": i["cidade-associado"]?.$?.nome,
      estado: i["cidade-associado"]?.estado?.$?.["sigla-uf"],
    })),
  };
};