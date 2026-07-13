interface InsumoAlertaCPFSuspeitoSPC {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
  "detalhe-insumo_alerta-cpf-suspeito": {
    "data-expedicao-documento": string;
    "cpf-suspeito": string;
    "dados-existentes-base-spc": string;
  };
}

export interface Get5264AlertaCPFSuspeitoOutput {
  resumo: {
    total: string;
  };
  detalhe: {
    "data-expedicao-documento": string;
    "cpf-suspeito": string;
    "dados-existentes-base-spc": string;
  };
}

export const get5264AlertaCPFSuspeitoInput = (
  alertaCPFSuspeito: InsumoAlertaCPFSuspeitoSPC,
): Get5264AlertaCPFSuspeitoOutput => ({
  resumo: {
    total:
      alertaCPFSuspeito?.resumo?.$?.["quantidade-total"],
  },
  detalhe: {
    "data-expedicao-documento":
      alertaCPFSuspeito?.["detalhe-insumo_alerta-cpf-suspeito"]?.[
        "data-expedicao-documento"
      ],
    "cpf-suspeito":
      alertaCPFSuspeito?.["detalhe-insumo_alerta-cpf-suspeito"]?.[
        "cpf-suspeito"
      ],
    "dados-existentes-base-spc":
      alertaCPFSuspeito?.["detalhe-insumo_alerta-cpf-suspeito"]?.[
        "dados-existentes-base-spc"
      ],
  },
});