export const get21ConsultaRealizadaInput = (consultaRealizada: {
  $?: {
    "quantidade-dias-consultados"?: string;
  };
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-ultima-ocorrencia"?: string;
    };
  };
  "detalhe-consulta-realizada"?: {
    $?: {
      "nome-associado"?: string;
      "data-consulta"?: string;
      "nome-entidade-origem"?: string;
    };
    "origem-associado"?: {
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
  "quantidade-dias-consultados"?: string;
  resumo: {
    "quantidade-total"?: string;
    "data-ultima-ocorrencia"?: string;
  };
  "detalhe-consulta-realizada": {
    "nome-associado"?: string;
    "data-consulta"?: string;
    "nome-entidade-origem"?: string;
    "origem-associado"?: string;
    estado?: string;
  }[];
} => ({
  "quantidade-dias-consultados":
    consultaRealizada?.$?.["quantidade-dias-consultados"],

  resumo: {
    "quantidade-total": consultaRealizada?.resumo?.$?.["quantidade-total"],
    "data-ultima-ocorrencia":
      consultaRealizada?.resumo?.$?.["data-ultima-ocorrencia"],
  },

  "detalhe-consulta-realizada":
    consultaRealizada?.["detalhe-consulta-realizada"]?.map((i) => ({
      "nome-associado": i.$?.["nome-associado"],
      "data-consulta": i.$?.["data-consulta"],
      "nome-entidade-origem": i.$?.["nome-entidade-origem"],
      "origem-associado": i["origem-associado"]?.$?.nome,
      estado: i["origem-associado"]?.estado?.$?.["sigla-uf"],
    })) ?? [],
});
