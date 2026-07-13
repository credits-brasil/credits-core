export const get5241GrupoEconomicoInput = (grupoEconomico: {
  resumo?: {
    $?: {
      "quantidade-total"?: string;
    };
  };
  "detalhe-grupo-economico"?: {
    documento?: string;
    qtdSocio?: string;
    qtdParticipacaoEmpresa?: string;
    qtdFiliaisConsultadas?: string;
    participacaoEmpresas?: unknown;
    socios?: {
      socio?: unknown | unknown[];
    };
    filiaisConsultadas?: unknown;
  };
}): {
  resumo: {
    "quantidade-total"?: string;
  };
  "detalhe-grupo-economico": {
    documento?: string;
    qtdSocio?: string;
    qtdParticipacaoEmpresa?: string;
    qtdFiliaisConsultadas?: string;
    participacaoEmpresas?: unknown;
    socios: {
      socio: unknown[];
    };
    filiaisConsultadas?: unknown;
  };
} => ({
  resumo: {
    "quantidade-total":
      grupoEconomico?.resumo?.$?.["quantidade-total"],
  },

  "detalhe-grupo-economico": {
    documento:
      grupoEconomico?.["detalhe-grupo-economico"]?.documento,
    qtdSocio:
      grupoEconomico?.["detalhe-grupo-economico"]?.qtdSocio,
    qtdParticipacaoEmpresa:
      grupoEconomico?.["detalhe-grupo-economico"]?.qtdParticipacaoEmpresa,
    qtdFiliaisConsultadas:
      grupoEconomico?.["detalhe-grupo-economico"]?.qtdFiliaisConsultadas,
    participacaoEmpresas:
      grupoEconomico?.["detalhe-grupo-economico"]?.participacaoEmpresas,

    socios: {
      socio: (() => {
        const socio =
          grupoEconomico?.["detalhe-grupo-economico"]?.socios?.socio;

        return Array.isArray(socio) ? socio : socio ? [socio] : [];
      })(),
    },

    filiaisConsultadas:
      grupoEconomico?.["detalhe-grupo-economico"]?.filiaisConsultadas,
  },
});