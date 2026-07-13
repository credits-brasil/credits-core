export const get5225MovimentacaoCadastroPositivoInput =
  (movimentacaoCadastroPositivo: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };

    "detalhe-movimentacao-cadastro-positivo"?: {
      $?: {
        "ano-entrada"?: string;
        "mes-entrada"?: string;
      };
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };

    "detalhe-movimentacao-cadastro-positivo": {
      "ano-entrada"?: string;
      "mes-entrada"?: string;
    };
  } => {
    const detalhe =
      movimentacaoCadastroPositivo?.["detalhe-movimentacao-cadastro-positivo"];

    return {
      resumo: {
        "quantidade-total":
          movimentacaoCadastroPositivo?.resumo?.$?.["quantidade-total"],
      },

      "detalhe-movimentacao-cadastro-positivo": {
        "ano-entrada": detalhe?.$?.["ano-entrada"],
        "mes-entrada": detalhe?.$?.["mes-entrada"],
      },
    };
  };
