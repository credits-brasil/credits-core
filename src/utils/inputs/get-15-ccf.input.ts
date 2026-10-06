export const get15CCFInput = (ccf: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-ultima-ocorrencia"?: string;
    };
  };
  "detalhe-ccf"?:
    | {
        $?: {
          "data-ultimo-cheque"?: string;
          origem?: string;
          quantidade?: string;
        };
        motivo?: {
          $?: {
            codigo?: string;
            descricao?: string;
          };
        };
        "ultimo-cheque"?: {
          "dados-bancarios"?: {
            $?: {
              "numero-agencia"?: string;
            };
            banco?: {
              $?: {
                codigo?: string;
                nome?: string;
              };
            };
          };
        };
      }
    | {
        $?: {
          "data-ultimo-cheque"?: string;
          origem?: string;
          quantidade?: string;
        };
        motivo?: {
          $?: {
            codigo?: string;
            descricao?: string;
          };
        };
        "ultimo-cheque"?: {
          "dados-bancarios"?: {
            $?: {
              "numero-agencia"?: string;
            };
            banco?: {
              $?: {
                codigo?: string;
                nome?: string;
              };
            };
          };
        };
      }[];
}): {
  resumo: {
    "quantidade-total"?: string;
    "data-ultima-ocorrencia"?: string;
  };
  "detalhe-ccf": {
    "data-ultimo-cheque"?: string;
    origem?: string;
    quantidade?: string;
    motivo: {
      codigo?: string;
      descricao?: string;
    };
    "ultimo-cheque": {
      "numero-agencia"?: string;
      banco: {
        codigo?: string;
        nome?: string;
      };
    };
  }[];
} => ({
  resumo: {
    "quantidade-total": ccf?.resumo?.$?.["quantidade-total"],
    "data-ultima-ocorrencia": ccf?.resumo?.$?.["data-ultima-ocorrencia"],
  },

  "detalhe-ccf": (() => {
    const detalhes = ccf?.["detalhe-ccf"];

    const lista = Array.isArray(detalhes)
      ? detalhes
      : detalhes
        ? [detalhes]
        : [];

    return lista.map((item) => ({
      "data-ultimo-cheque": item.$?.["data-ultimo-cheque"],
      origem: item.$?.origem,
      quantidade: item.$?.quantidade,

      motivo: {
        codigo: item.motivo?.$?.codigo,
        descricao: item.motivo?.$?.descricao,
      },

      "ultimo-cheque": {
        "numero-agencia":
          item["ultimo-cheque"]?.["dados-bancarios"]?.$?.["numero-agencia"],

        banco: {
          codigo: item["ultimo-cheque"]?.["dados-bancarios"]?.banco?.$?.codigo,
          nome: item["ultimo-cheque"]?.["dados-bancarios"]?.banco?.$?.nome,
        },
      },
    }));
  })(),
});
