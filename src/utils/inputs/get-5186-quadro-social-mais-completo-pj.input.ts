type XmlValue = {
  $?: {
    [key: string]: string | undefined;
  };
};

type DetalhesSocio1 = {
  $?: {
    documento?: string;
    nacionalidade?: string;
    nome?: string;
    percentual?: string;
    tipoPessoa?: string;
  };
};

type DetalhesSocio2 = {
  $?: {
    percentualCapitalVotante?: string;
  };
};

type Administrativo = {
  $?: {
    cargo?: string;
    documento?: string;
    nacionalidade?: string;
    nome?: string;
    tipoPessoa?: string;
  };
};

type InformacoesAdicionais1 = {
  $?: {
    cep?: string;
    cidade?: string;
    dataNascimento?: string;
    documento?: string;
    rg?: string;
    ddd?: string;
    uf?: string;
    vinculo?: string;
  };
};

type InformacoesAdicionais2 = {
  $?: {
    logradouro?: string;
    bairro?: string;
  };
};

type InformacoesAdicionais3 = {
  $?: {
    nome?: string;
  };
};

type Restricao = {
  $?: {
    dataUltimaOcorrencia?: string;
    descricao?: string;
    quantidadeOcorrencias?: string;
    valorTotalOcorrencia?: string;
  };
};

type SemRestricao = {
  $?: {
    descricao?: string;
    mensagem?: string;
  };
};

type ControleSocietario = {
  "detalhes-socio-1"?: DetalhesSocio1;
  "detalhes-socio-2"?: DetalhesSocio2;

  "informacoes-adicionais-1"?: InformacoesAdicionais1;
  "informacoes-adicionais-2"?: InformacoesAdicionais2;
  "informacoes-adicionais-3"?: InformacoesAdicionais3;

  restricoes?: Restricao;

  "sem-restricoes"?: SemRestricao[];
};

type QuadroAdministrativo = {
  administrativo?: Administrativo;

  "informacoes-adicionais-1"?: InformacoesAdicionais1;
  "informacoes-adicionais-2"?: InformacoesAdicionais2;
  "informacoes-adicionais-3"?: InformacoesAdicionais3;

  restricoes?: Restricao;

  "sem-restricoes"?: SemRestricao[];
};

export const get5186QuadroSocialMaisCompletoPjInput = (quadroSocial: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };

  "detalhe-quadro-social-mais-completo-pj"?: {
    "controle-societario"?: ControleSocietario[];

    "quadro-administrativo"?: QuadroAdministrativo[];
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };

  "detalhe-quadro-social-mais-completo-pj": {
    "controle-societario": ControleSocietario[];
    "quadro-administrativo": QuadroAdministrativo[];
  };
} => {
  const detalhe = quadroSocial?.["detalhe-quadro-social-mais-completo-pj"];

  return {
    resumo: {
      "quantidade-total": quadroSocial?.resumo?.$?.["quantidade-total"],
    },

    "detalhe-quadro-social-mais-completo-pj": {
      "controle-societario": detalhe?.["controle-societario"] ?? [],

      "quadro-administrativo": detalhe?.["quadro-administrativo"] ?? [],
    },
  };
};
