const normalizeSecondaryActivities = (
  value?:
    | {
        $?: {
          descricao?: string;
          codigo?: string;
        };
      }
    | {
        $?: {
          descricao?: string;
          codigo?: string;
        };
      }[]
    | null,
) => {
  if (!value) {
    return [];
  }

  const items = Array.isArray(value) ? value : [value];

  return items.map((item) => ({
    description: item?.$?.descricao,
    code: item?.$?.codigo,
  }));
};

export const get64AtividadeEmpresaInput = (atividadeEmpresa: {
  "detalhe-atividade-empresa"?: {
    "ramo-atividade"?: {
      $?: {
        descricao?: string;
        codigo?: string;
      };
    };
    "atividades-economicas-secundarias"?:
      | {
          $?: {
            descricao?: string;
            codigo?: string;
          };
        }
      | {
          $?: {
            descricao?: string;
            codigo?: string;
          };
        }[]
      | null;
  };
}): {
  "detalhe-atividade-empresa": {
    "ramo-atividade": {
      description?: string;
      code?: string;
    };
    "atividades-economicas-secundarias": {
      description?: string;
      code?: string;
    }[];
  };
} => ({
  "detalhe-atividade-empresa": {
    "ramo-atividade": {
      description:
        atividadeEmpresa?.["detalhe-atividade-empresa"]?.["ramo-atividade"]?.$
          ?.descricao,
      code: atividadeEmpresa?.["detalhe-atividade-empresa"]?.["ramo-atividade"]
        ?.$?.codigo,
    },
    "atividades-economicas-secundarias": normalizeSecondaryActivities(
      atividadeEmpresa?.["detalhe-atividade-empresa"]?.[
        "atividades-economicas-secundarias"
      ],
    ),
  },
});
