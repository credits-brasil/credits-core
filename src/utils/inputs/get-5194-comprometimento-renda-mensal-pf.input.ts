export const get5194ComprometimentoRendaMensalPfInput =
  (comprometimentoRendaMensalPf: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-comprometimento-renda-mensal-pf"?: {
      "classificacao-endividamento"?: string;
      faixa?: string;
      "flag-endividamento"?: string;
      percentual?: string;
    };
  }) => ({
    resumo: {
      "quantidade-total":
        comprometimentoRendaMensalPf?.resumo?.$?.["quantidade-total"] ?? "0",
    },
    "detalhe-comprometimento-renda-mensal-pf": {
      "classificacao-endividamento":
        comprometimentoRendaMensalPf?.[
          "detalhe-comprometimento-renda-mensal-pf"
        ]?.["classificacao-endividamento"],
      faixa:
        comprometimentoRendaMensalPf?.[
          "detalhe-comprometimento-renda-mensal-pf"
        ]?.faixa,
      "flag-endividamento":
        comprometimentoRendaMensalPf?.[
          "detalhe-comprometimento-renda-mensal-pf"
        ]?.["flag-endividamento"],
      percentual:
        comprometimentoRendaMensalPf?.[
          "detalhe-comprometimento-renda-mensal-pf"
        ]?.percentual,
    },
  });
