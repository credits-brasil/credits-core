export const get5227IndicePontualidadePagamentoCadastroPositivoInput =
  (indicePontualidade: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-indice-pontualidade-pagamento-cadastro-positivo"?: {
      segmentos?: {
        $?: {
          nome?: string;
        };
        periodos?: {
          $?: {
            "pagamento-comprovado"?: string;
            descricao?: string;
            porcentual?: string;
          };
        }[];
      }[];
    };
  }): {
    resumo: {
      "quantidade-total"?: string;
    };
    "detalhe-indice-pontualidade-pagamento-cadastro-positivo": {
      segmentos: {
        nome?: string;
        periodos: {
          "pagamento-comprovado"?: string;
          descricao?: string;
          porcentual?: string;
        }[];
      }[];
    };
  } => ({
    resumo: {
      "quantidade-total": indicePontualidade?.resumo?.$?.["quantidade-total"],
    },
    "detalhe-indice-pontualidade-pagamento-cadastro-positivo": {
      segmentos:
        indicePontualidade?.[
          "detalhe-indice-pontualidade-pagamento-cadastro-positivo"
        ]?.segmentos?.map((segmento) => ({
          nome: segmento.$?.nome,
          periodos:
            segmento.periodos?.map((periodo) => ({
              "pagamento-comprovado": periodo.$?.["pagamento-comprovado"],
              descricao: periodo.$?.descricao,
              porcentual: periodo.$?.porcentual,
            })) ?? [],
        })) ?? [],
    },
  });
