type DetalheContumacia = {
  $?: {
    "data-inclusao"?: string;
    "data-ocorrencia"?: string;
    origem?: string;
  };
  motivo?: {
    $?: {
      codigo?: string;
      descricao?: string;
    };
  };
  "cheque-inicial"?: {
    $?: {
      numero?: string;
    };
    "dados-bancarios"?: {
      $?: {
        "numero-agencia"?: string;
        "numero-conta-corrente"?: string;
      };
      banco?: {
        $?: {
          codigo?: string;
          nome?: string;
        };
      };
    };
  };
  "cheque-final"?: {
    $?: {
      numero?: string;
    };
  };
};

export const get22ContumaciaInput = (contumacia: {
  $?: {
    "data-final-periodo-consultado"?: string;
    "data-inicial-periodo-consultado"?: string;
  };
  resumo?: {
    $?: {
      "quantidade-total"?: string;
      "data-ultima-ocorrencia"?: string;
    };
  };
  "detalhe-contumacia"?: DetalheContumacia | DetalheContumacia[];
}): {
  resumo: {
    "quantidade-total"?: string;
    "data-ultima-ocorrencia"?: string;
  };
  "detalhe-contumacia": Array<{
    "data-inclusao"?: string;
    "data-ocorrencia"?: string;
    origem?: string;
    motivo?: {
      codigo?: string;
      descricao?: string;
    };
    "cheque-inicial"?: {
      numero?: string;
      "dados-bancarios"?: {
        "numero-agencia"?: string;
        "numero-conta-corrente"?: string;
        banco?: {
          codigo?: string;
          nome?: string;
        };
      };
    };
    "cheque-final"?: {
      numero?: string;
    };
  }>;
} => {
  const detalhes = contumacia["detalhe-contumacia"];
  const detalhesArray = Array.isArray(detalhes)
    ? detalhes
    : detalhes
      ? [detalhes]
      : [];

  return {
    resumo: {
      "quantidade-total": contumacia.resumo?.$?.["quantidade-total"],
      "data-ultima-ocorrencia": contumacia.resumo?.$?.["data-ultima-ocorrencia"],
    },
    "detalhe-contumacia": detalhesArray.map((detalhe) => ({
      "data-inclusao": detalhe.$?.["data-inclusao"],
      "data-ocorrencia": detalhe.$?.["data-ocorrencia"],
      origem: detalhe.$?.origem,
      motivo: detalhe.motivo?.$ ? {
        codigo: detalhe.motivo.$.codigo,
        descricao: detalhe.motivo.$.descricao,
      } : undefined,
      "cheque-inicial": detalhe["cheque-inicial"] ? {
        numero: detalhe["cheque-inicial"].$?.numero,
        "dados-bancarios": detalhe["cheque-inicial"]["dados-bancarios"] ? {
          "numero-agencia": detalhe["cheque-inicial"]["dados-bancarios"].$?.["numero-agencia"],
          "numero-conta-corrente": detalhe["cheque-inicial"]["dados-bancarios"].$?.["numero-conta-corrente"],
          banco: detalhe["cheque-inicial"]["dados-bancarios"].banco?.$ ? {
            codigo: detalhe["cheque-inicial"]["dados-bancarios"].banco.$.codigo,
            nome: detalhe["cheque-inicial"]["dados-bancarios"].banco.$.nome,
          } : undefined,
        } : undefined,
      } : undefined,
      "cheque-final": detalhe["cheque-final"] ? {
        numero: detalhe["cheque-final"].$?.numero,
      } : undefined,
    })),
  };
};
