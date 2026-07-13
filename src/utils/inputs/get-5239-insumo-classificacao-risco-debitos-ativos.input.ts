interface InsumoClassificacaoRiscoDebitosAtivosSPC {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
  "detalhe-insumo-classificacao-risco-debitos-ativos"?: {
    "classe-severidade"?: string;
    descricao?: string;
    risco?: string;
    "taxa-mau-pagador"?: string;
  };
}

export interface Get5239ClassificacaoRiscoDebitosAtivosOutput {
  resumo: {
    total: string;
  };
  detalhe: {
    "classe-severidade"?: string;
    descricao?: string;
    risco?: string;
    "taxa-mau-pagador"?: string;
  };
}

export const get5239ClassificacaoRiscoDebitosAtivosInput = (
  classificacaoRiscoDebitosAtivos: InsumoClassificacaoRiscoDebitosAtivosSPC,
): Get5239ClassificacaoRiscoDebitosAtivosOutput => ({
  resumo: {
    total: classificacaoRiscoDebitosAtivos.resumo.$["quantidade-total"],
  },
  detalhe: {
    "classe-severidade":
      classificacaoRiscoDebitosAtivos?.[
        "detalhe-insumo-classificacao-risco-debitos-ativos"
      ]?.["classe-severidade"],
    descricao:
      classificacaoRiscoDebitosAtivos?.[
        "detalhe-insumo-classificacao-risco-debitos-ativos"
      ]?.descricao,
    risco:
      classificacaoRiscoDebitosAtivos?.[
        "detalhe-insumo-classificacao-risco-debitos-ativos"
      ]?.risco,
    "taxa-mau-pagador":
      classificacaoRiscoDebitosAtivos?.[
        "detalhe-insumo-classificacao-risco-debitos-ativos"
      ]?.["taxa-mau-pagador"],
  },
});
