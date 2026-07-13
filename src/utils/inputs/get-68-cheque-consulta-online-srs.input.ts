export const get68ChequeConsultaOnlineSRSInput = (chequeConsultaOnlineSRS: {
  resumo: {
    $: {
      "quantidade-total": string;
    };
  };
}) => chequeConsultaOnlineSRS.resumo.$["quantidade-total"];
