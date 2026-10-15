export const get5228ScoreCadastroPositivoInput = (scoreCadastroPositivo: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-score-cadastro-positivo"?: {
    $?: {
      "indice-risco-credito-score"?: string;
      mensagem?: string;
      probabilidadeInadimplencia?: string;
      score?: string;
      "score-maximo-escala"?: string;
    };
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-score-cadastro-positivo": {
    "indice-risco-credito-score"?: string;
    mensagem?: string;
    probabilidadeInadimplencia?: string;
    score?: string;
    "score-maximo-escala"?: string;
  };
} => ({
  resumo: {
    "quantidade-total": scoreCadastroPositivo?.resumo?.$?.["quantidade-total"],
  },
  "detalhe-score-cadastro-positivo": {
    "indice-risco-credito-score":
      scoreCadastroPositivo?.["detalhe-score-cadastro-positivo"]?.$?.[
        "indice-risco-credito-score"
      ],
    mensagem:
      scoreCadastroPositivo?.["detalhe-score-cadastro-positivo"]?.$?.mensagem,
    probabilidadeInadimplencia:
      scoreCadastroPositivo?.["detalhe-score-cadastro-positivo"]?.$?.[
        "probabilidadeInadimplencia"
      ],
    score: scoreCadastroPositivo?.["detalhe-score-cadastro-positivo"]?.$?.score,
    "score-maximo-escala":
      scoreCadastroPositivo?.["detalhe-score-cadastro-positivo"]?.$?.[
        "score-maximo-escala"
      ],
  },
});
