export const get64AtividadeEmpresaInput = (atividadeEmpresa: {
  "detalhe-atividade-empresa"?: {
    "ramo-atividade"?: {
      $?: {
        descricao?: string;
        codigo?: string;
      };
    };
    "atividades-economicas-secundarias"?: {
      $?: {
        descricao?: string;
        codigo?: string;
      };
    }[];
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
    "atividades-economicas-secundarias":
      atividadeEmpresa?.["detalhe-atividade-empresa"]?.[
        "atividades-economicas-secundarias"
      ]?.map((i) => ({
        description: i.$?.descricao,
        code: i.$?.codigo,
      })) ?? [],
  },
});
