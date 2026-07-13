interface InsumoPEPSPC {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}

export interface Get5255PEPOutput {
  total: string;
}

export const get5255PEPInput = (pep: InsumoPEPSPC): Get5255PEPOutput => ({
  total: pep.resumo.$?.["quantidade-total"],
});
