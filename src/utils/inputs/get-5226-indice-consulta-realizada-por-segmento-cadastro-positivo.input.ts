export const get5226IndiceConsultaRealizadaPorSegmentoCadastroPositivoInput = (
  indiceConsultaRealizadaPorSegmentoCadastroPositivo: {
    resumo?: {
      $?: {
        "quantidade-total"?: string;
      };
    };
    "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo"?: {
      $?: {
        "total-geral-consultas"?: string;
      };
      "consultas-por-ramo-atividade-por-mes"?:
        | {
            $?: {
              "numero-total-consultas"?: string;
            };
            "ramo-atividade"?: {
              $?: {
                descricao?: string;
              };
            };
            "numero-consultas-por-mes"?:
              | {
                  $?: {
                    ano?: string;
                    mes?: string;
                    "nome-mes"?: string;
                    "numero-consultas"?: string;
                  };
                }
              | {
                  $?: {
                    ano?: string;
                    mes?: string;
                    "nome-mes"?: string;
                    "numero-consultas"?: string;
                  };
                }[];
          }
        | {
            $?: {
              "numero-total-consultas"?: string;
            };
            "ramo-atividade"?: {
              $?: {
                descricao?: string;
              };
            };
            "numero-consultas-por-mes"?:
              | {
                  $?: {
                    ano?: string;
                    mes?: string;
                    "nome-mes"?: string;
                    "numero-consultas"?: string;
                  };
                }
              | {
                  $?: {
                    ano?: string;
                    mes?: string;
                    "nome-mes"?: string;
                    "numero-consultas"?: string;
                  };
                }[];
          }[];
      "total-consultas-por-mes"?:
        | {
            $?: {
              ano?: string;
              mes?: string;
              "nome-mes"?: string;
              "numero-consultas"?: string;
            };
          }
        | {
            $?: {
              ano?: string;
              mes?: string;
              "nome-mes"?: string;
              "numero-consultas"?: string;
            };
          }[];
      "ultimas-consultas"?:
        | {
            $?: {
              "data-consulta-mais-recente"?: string;
              "ramo-atividade"?: string;
            };
          }
        | {
            $?: {
              "data-consulta-mais-recente"?: string;
              "ramo-atividade"?: string;
            };
          }[];
    };
  },
): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo": {
    "total-geral-consultas"?: string;
    "consultas-por-ramo-atividade-por-mes": {
      "numero-total-consultas"?: string;
      "ramo-atividade"?: string;
      "numero-consultas-por-mes": {
        ano?: string;
        mes?: string;
        "nome-mes"?: string;
        "numero-consultas"?: string;
      }[];
    }[];
    "total-consultas-por-mes": {
      ano?: string;
      mes?: string;
      "nome-mes"?: string;
      "numero-consultas"?: string;
    }[];
    "ultimas-consultas": {
      "data-consulta-mais-recente"?: string;
      "ramo-atividade"?: string;
    }[];
  };
} => ({
  resumo: {
    "quantidade-total":
      indiceConsultaRealizadaPorSegmentoCadastroPositivo?.resumo?.$?.[
        "quantidade-total"
      ],
  },

  "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo": {
    "total-geral-consultas":
      indiceConsultaRealizadaPorSegmentoCadastroPositivo?.[
        "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo"
      ]?.$?.["total-geral-consultas"],

    "consultas-por-ramo-atividade-por-mes": (() => {
      const consultas =
        indiceConsultaRealizadaPorSegmentoCadastroPositivo?.[
          "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo"
        ]?.["consultas-por-ramo-atividade-por-mes"];

      const lista = Array.isArray(consultas)
        ? consultas
        : consultas
          ? [consultas]
          : [];

      return lista.map((consulta) => {
        const meses = consulta["numero-consultas-por-mes"];

        const listaMeses = Array.isArray(meses)
          ? meses
          : meses
            ? [meses]
            : [];

        return {
          "numero-total-consultas":
            consulta.$?.["numero-total-consultas"],
          "ramo-atividade":
            consulta["ramo-atividade"]?.$?.descricao,
          "numero-consultas-por-mes": listaMeses.map((mes) => ({
            ano: mes.$?.ano,
            mes: mes.$?.mes,
            "nome-mes": mes.$?.["nome-mes"],
            "numero-consultas": mes.$?.["numero-consultas"],
          })),
        };
      });
    })(),

    "total-consultas-por-mes": (() => {
      const total =
        indiceConsultaRealizadaPorSegmentoCadastroPositivo?.[
          "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo"
        ]?.["total-consultas-por-mes"];

      const lista = Array.isArray(total)
        ? total
        : total
          ? [total]
          : [];

      return lista.map((i) => ({
        ano: i.$?.ano,
        mes: i.$?.mes,
        "nome-mes": i.$?.["nome-mes"],
        "numero-consultas": i.$?.["numero-consultas"],
      }));
    })(),

    "ultimas-consultas": (() => {
      const ultimas =
        indiceConsultaRealizadaPorSegmentoCadastroPositivo?.[
          "detalhe-indice-consulta-realizada-por-segmento-cadastro-positivo"
        ]?.["ultimas-consultas"];

      const lista = Array.isArray(ultimas)
        ? ultimas
        : ultimas
          ? [ultimas]
          : [];

      return lista.map((i) => ({
        "data-consulta-mais-recente":
          i.$?.["data-consulta-mais-recente"],
        "ramo-atividade": i.$?.["ramo-atividade"],
      }));
    })(),
  },
});