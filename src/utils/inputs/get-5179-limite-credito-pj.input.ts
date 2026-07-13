export const get5179LimiteCreditoPJInput = (limiteCreditoPJ: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "valor-total"?: string;
    };
  };
  "detalhe-limite-credito-pj"?: {
    $?: {
      "data-calculo"?: string;
      "valor-limite-credito"?: string;
      mensagem?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
    "valor-total"?: string;
  };
  "detalhe-limite-credito-pj": {
    "data-calculo"?: string;
    "valor-limite-credito"?: string;
    mensagem?: string;
  };
} => ({
  resumo: {
    "quantidade-total": limiteCreditoPJ?.resumo?.$?.["quantidade-total"],
    "valor-total": limiteCreditoPJ?.resumo?.$?.["valor-total"],
  },
  "detalhe-limite-credito-pj": {
    "data-calculo":
      limiteCreditoPJ?.["detalhe-limite-credito-pj"]?.$?.["data-calculo"],
    "valor-limite-credito":
      limiteCreditoPJ?.["detalhe-limite-credito-pj"]?.$?.[
        "valor-limite-credito"
      ],
    mensagem: limiteCreditoPJ?.["detalhe-limite-credito-pj"]?.$?.mensagem,
  },
});
