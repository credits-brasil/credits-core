export interface SpcApiResponse {
  statusCode: number;
  message: string;
  spc: SpcWrapper;
}

export interface SpcWrapper {
  xml: string;
  json: SoapEnvelope;
}

export interface SoapEnvelope {
  "S:Envelope": Envelope;
}

export interface Envelope {
  $: {
    "xmlns:S": string;
  };
  "S:Body": Body;
}

export interface Body {
  "ns2:resultado": Resultado;
}

export interface Socio {
  nomeOrigem: string;
  documentoOrigem: string;
  cargo: string;
  documento: string;
  nome: string;
  qtdEmpresas: string;
  tipoPessoa: string;
  restricao: string;

  gruposEconomicosAssociados?: {
    grupoEconomicoAssociado:
      | GrupoEconomicoAssociado
      | GrupoEconomicoAssociado[];
  };
}

export interface GrupoEconomicoAssociado {
  nomeOrigem: string;
  documentoOrigem: string;
  cargo: string;
  documento: string;
  nome: string;
  qtdEmpresas: string;
  tipoPessoa: string;
  restricao: string;

  gruposEconomicosAssociados?: {
    grupoEconomicoAssociado:
      | GrupoEconomicoAssociado
      | GrupoEconomicoAssociado[];
  };
}

export interface Resultado {
  $: {
    "xmlns:ns2": string;
    restricao: string;
    data: string;
  };

  protocolo: {
    $: {
      numero: string;
      digito: string;
    };
  };

  operador: {
    $: {
      codigo: string;
      nome: string;
    };
  };

  consumidor: Consumidor;

  "grafia-pj": string;
  "endereco-cep-consultado": string;

  "telefone-consultado": ResumoOnly;
  "telefone-vinculado-assinante-consultado": ResumoOnly;

  "ultimo-telefone-informado": UltimoTelefoneInformado;

  "ultimo-endereco-informado": UltimoEnderecoInformado;

  "alerta-documento": ResumoOnly;

  spc: Spc;

  "cheque-lojista": ResumoOnly;
  ccf: ResumoOnly;
  "contra-ordem-documento-diferente": ResumoOnly;

  protesto: Protesto;

  "contra-ordem": ResumoOnly;
  contumacia: ResumoOnly;
  "credito-concedido": ResumoOnly;

  "dados-agencia-bancaria": string;

  "consulta-realizada": ConsultaRealizada;

  "informacao-poder-judiciario": ResumoOnly;

  "pendencia-financeira": PendenciaFinanceira;

  "cheque-sem-fundo-varejo": ResumoOnly;
  "cheque-consulta-online-srs": ResumoOnly;

  "capital-social": CapitalSocial;

  "atividade-empresa": AtividadeEmpresa;

  "spc-score-12-meses": SpcScore12Meses;

  "dados-adicionais-de-contato": DadosAdicionaisContato;

  // 5262
  "alerta-identidade-fraude": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  //5180
  "alerta-identidade": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  // 5266
  "analise-documentos-spc": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  // 5195
  "collection-score-plus": string;

  // 5194
  "comprometimento-renda-mensal-pf": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  // 5244
  "divida-publica-cadin": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  // 5178
  "faturamento-presumido": {
    resumo: {
      $: {
        "quantidade-total": string;
        "valor-total": string;
      };
    };
    "detalhe-faturamento-presumido": {
      $: {
        "valor-faturamento": string;
      };
    };
  };

  // 5185
  "gasto-estimado-pj": {
    resumo: {
      $: {
        "quantidade-total": string;
        "valor-total": string;
      };
    };
    "detalhe-gasto-estimado-pj": {
      valor: string;
    };
  };

  // 5241
  "grupo-economico": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };

    "detalhe-grupo-economico": {
      documento: string;
      qtdSocio: string;
      qtdParticipacaoEmpresa: string;
      qtdFiliaisConsultadas: string;
      participacaoEmpresas: string;
      socios: {
        socio: Socio | Socio[];
      };

      filiaisConsultadas: string;
    };
  };

  // 5224
  "indice-comportamento-gastos-cadastro-positivo": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
    "detalhe-indice-comportamento-gastos-cadastro-positivo": {
      $: {
        "gasto-total-final": string;
        "gasto-total-inicial": string;
      };
      segmentos: {
        $: {
          nome: string;
          "porcentual-representatividade": string;
        };
      }[];
    };
  };

  // 5227
  "indice-pontualidade-pagamento-cadastro-positivo": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
    "detalhe-indice-pontualidade-pagamento-cadastro-positivo": {
      segmentos: {
        $: {
          nome: string;
        };
        periodos: {
          $: {
            "pagamento-comprovado": string; // "true" | "false"
            descricao: string;
            porcentual: string; // vem como string do XML
          };
        }[];
      }[];
    };
  };

  // 5179
  "limite-credito-pj": {
    resumo: {
      $: {
        "quantidade-total": string;
        "valor-total": string;
      };
    };
    "detalhe-limite-credito-pj": {
      $: {
        "data-calculo": string;
        "valor-limite-credito": string;
        mensagem: string;
      };
    };
  };

  // 5142
  "limite-credito-sugerido": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  //  5232
  "perfil-comportamental": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  //  5184
  "risco-credito-pj": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
    "detalhe-risco-credito-pj": {
      probabilidadeInadimplencia: string;
      mensagemRetorno: string;
    };
  };

  //  5228
  "score-cadastro-positivo": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  //  5229
  "score-pj": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
    "detalhe-score-pj": {
      $: {
        classe: string;
        horizonte: string;
        "mesagem-interpretativa-score": string;
        probabilidade: string;
        score: string;
        "tipo-cliente-score": string;
      };
    };
  };

  //  5245
  "score-recuperacao-pj": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
    "detalhe-score-recuperacao-pj": {
      $: {
        score: string;
      };
    };
  };

  //  5259
  "score-similaridade-cadastral": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };

  //  3082 Apenas PF
  "spc-obito": {
    resumo: {
      $: {
        "quantidade-total": string
      };
    };
  };

  //  5268
  "valida-celular": {
    resumo: {
      $: {
        "quantidade-total": string;
      };
    };
  };
}

/* ===================== SPC ===================== */

export interface Spc {
  resumo: {
    $: {
      "quantidade-total": string;
      "data-ultima-ocorrencia": string;
      "valor-total": string;
    };
  };

  "detalhe-spc": DetalheSpc[];
}

export interface DetalheSpc {
  $: {
    "nome-associado": string;
    "data-inclusao": string;
    "data-vencimento": string;
    "nome-entidade": string;
    contrato: string;
    "registro-instituicao-financeira": string;
    "comprador-fiador-avalista": string;
    valor: string;
    "codigo-entidade"?: string;
  };

  "telefone-associado"?: TelefoneAssociado;

  "cidade-associado"?: CidadeAssociado;
}

export interface TelefoneAssociado {
  $: {
    "numero-ddd": string;
    numero: string;
  };
}

export interface CidadeAssociado {
  $: {
    nome: string;
  };

  estado: {
    $: {
      "sigla-uf": string;
    };
  };
}

/* ===================== PROTESTO ===================== */

export interface Protesto {
  resumo: {
    $: {
      "quantidade-total": string;
      "data-primeira-ocorrencia": string;
      "data-ultima-ocorrencia": string;
      "valor-total": string;
    };
  };

  "detalhe-protesto": DetalheProtesto[];
}

export interface DetalheProtesto {
  $: {
    "data-protesto": string;
    valor: string;
  };

  cartorio: {
    $: {
      nome: string;
    };

    cidade: {
      $: {
        nome: string;
      };

      estado: {
        $: {
          "sigla-uf": string;
        };
      };
    };
  };
}

/* ===================== PENDÊNCIA FINANCEIRA ===================== */

export interface PendenciaFinanceira {
  $: {
    "ocorrencia-mais-antiga-chequenet": string;
    "ocorrencia-mais-recente-chequenet": string;
  };

  resumo: {
    $: {
      "quantidade-total": string;
      "data-ultima-ocorrencia": string;
      "valor-total": string;
    };
  };

  "detalhe-pendencia-financeira": DetalhePendenciaFinanceira[];
}

export interface DetalhePendenciaFinanceira {
  $: {
    avalista: string;
    contrato: string;
    "data-ocorrencia": string;
    origem: string;
    "titulo-ocorrencia": string;
    "valor-pendencia": string;
  };

  moeda: {
    $: {
      simbolo: string;
    };
  };

  cidade?: {
    $: {
      nome: string;
    };
    estado: {
      $: {
        "sigla-uf": string;
      };
    };
  };
}

/* ===================== ÚLTIMO TELEFONE INFORMADO ===================== */

export interface UltimoTelefoneInformado {
  "detalhe-ultimo-telefone-informado": DetalheUltimoTelefoneInformado[];
}

export interface DetalheUltimoTelefoneInformado {
  $: {
    "data-primeira-consulta": string;
    "data-ultima-consulta": string;
    "quantidade-consulta": string;
  };

  telefone: {
    $: {
      "numero-ddd": string;
      numero: string;
    };
  };
}

/* ===================== ÚLTIMO ENDEREÇO INFORMADO ===================== */

export interface UltimoEnderecoInformado {
  "detalhe-ultimo-endereco-informado": DetalheUltimoEnderecoInformado[];
}

export interface DetalheUltimoEnderecoInformado {
  endereco: {
    $: {
      logradouro: string;
      numero: string;
      bairro: string;
      cep: string;
      complemento?: string;
    };

    cidade: {
      $: {
        nome: string;
      };

      estado: {
        $: {
          "sigla-uf": string;
        };
      };
    };
  };
}

/* ===================== CONSUMIDOR ===================== */

export interface Consumidor {
  "consumidor-pessoa-juridica": ConsumidorPJ;
}

export interface ConsumidorPJ {
  $: {
    "data-fundacao": string;
    email: string;
    "nome-comercial": string;
    "razao-social": string;
  };

  cnpj: {
    $: { numero: string };
  };

  "situacao-cnpj": {
    $: {
      "descricao-situacao": string;
      "data-situacao": string;
    };
  };

  endereco: Endereco;

  telefone: {
    $: {
      "numero-ddd": string;
      numero: string;
    };
  };

  "natureza-juridica": {
    $: {
      descricao: string;
      codigo: string;
    };
  };

  "atividade-economica-principal": AtividadeSimples;

  "atividade-economica-secundaria": AtividadeSimples[];
}

export interface Endereco {
  $: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
  };

  cidade: {
    $: { nome: string };
    estado: {
      $: { "sigla-uf": string };
    };
  };
}

export interface AtividadeSimples {
  $: {
    descricao: string;
    codigo: string;
  };
}

/* ===================== RESUMO BASE ===================== */

export interface ResumoOnly {
  resumo: {
    $: {
      "quantidade-total": string;
      "data-ultima-ocorrencia"?: string;
      "valor-total"?: string;
    };
  };
}

/* ===================== CONSULTA REALIZADA ===================== */

export interface ConsultaRealizada {
  $: {
    "quantidade-dias-consultados": string;
  };

  resumo: {
    $: {
      "quantidade-total": string;
      "data-ultima-ocorrencia": string;
    };
  };

  "detalhe-consulta-realizada": DetalheConsultaRealizada[];
}

export interface DetalheConsultaRealizada {
  $: {
    "nome-associado": string;
    "data-consulta": string;
    "nome-entidade-origem": string;
  };

  "origem-associado": {
    $: { nome: string };
    estado: {
      $: { "sigla-uf": string };
    };
  };
}

/* ===================== CAPITAL SOCIAL ===================== */

export interface CapitalSocial {
  "detalhe-capital-social": {
    $: {
      "valor-capital-social": string;
    };
  };
}

/* ===================== ATIVIDADE EMPRESA ===================== */

export interface AtividadeEmpresa {
  "detalhe-atividade-empresa": {
    "ramo-atividade": AtividadeSimples;
    "atividades-economicas-secundarias": AtividadeSimples[];
  };
}

/* ===================== SCORE ===================== */

export interface SpcScore12Meses {
  "detalhe-spc-score-12-meses": {
    $: {
      classe: string;
      horizonte: string;
      "mesagem-interpretativa-score": string;
      probabilidade: string;
      score: string;
      "tipo-cliente-score": string;
    };
  };
}

/* ===================== DADOS ADICIONAIS ===================== */

export interface DadosAdicionaisContato {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };

  "detalhe-dados-adicionais-de-contato": Array<
    | {
        celulares: string[];
        emails: string[];
        enderecosPJ: string[];
        telefones: string[];
      }
    | ""
  >;
}
