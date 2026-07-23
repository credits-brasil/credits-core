import { AppError } from "@/constants/spc";

import { FriendlyError, getTipoConsumidor } from "@/utils";
import { HTTPSPCService } from "@/services";
import { get18AcaoInput } from "@/utils/inputs/get-18-acao.input";
import { get49AdministradorInput } from "@/utils/inputs/get-49-administrador.input";
import { get19AlertaDocumentoInput } from "@/utils/inputs/get-19-alerta-documento.input";
import { get64AtividadeEmpresaInput } from "@/utils/inputs/get-64-atividade-empresa.input";
import { get48CapitalSocialInput } from "@/utils/inputs/get-48-capital-social.input";
import { get15CCFInput } from "@/utils/inputs/get-15-ccf.input";
import { get21ConsultaRealizadaInput } from "@/utils/inputs/get-21-consulta-realizada.input";
import { get1ConsumidorInput } from "@/utils/inputs/get-1-consumidor.input";
import { get16ContraOrdemInput } from "@/utils/inputs/get-16-contra-ordem.input";
import { get27ContraOrdemDocumentoDiferenteInput } from "@/utils/inputs/get-27-contra-ordem-documento-diferente.input";
import { get5233DadosAdicionaisDeContatoInput } from "@/utils/inputs/get-5233-dados-adicionais-de-contato.input";
import { get2GrafiaPJInput } from "@/utils/inputs/get-2-grafia-pj.input";
import { get67InformacaoPoderJudiciarioInput } from "@/utils/inputs/get-67-informacao-poder-judiciario.input";
import { get55PendenciaFinanceiraInput } from "@/utils/inputs/get-55-pendencia-financeira.input";
import { get17ProtestoInput } from "@/utils/inputs/get-17-protesto.input";
import { get23SocioInput } from "@/utils/inputs/get-23-socio.input";
import { get8SPCInput } from "@/utils/inputs/get-8-spc.input";
import { get44TelefoneVinculadoAssinanteConsultadoInput } from "@/utils/inputs/get-44-telefone-vinculado-assinante-consultado.input";
import { get5244DividaPublicaCadinInput } from "@/utils/inputs/get-5244-divida-publica-cadin.input";
import { get5178FaturamentoPresumidoInput } from "@/utils/inputs/get-5178-faturamento-presumido.input";
import { get5185GastoEstimadoPJInput } from "@/utils/inputs/get-5185-gasto-estimado-pj.input";
import { get5241GrupoEconomicoInput } from "@/utils/inputs/get-5241-grupo-economico.input";
import { get5224IndiceComportamentoGastosCadastroPositivoInput } from "@/utils/inputs/get-5224-indice-comportamento-gastos-cadastro-positivo.input";
import { get5226IndiceConsultaRealizadaPorSegmentoCadastroPositivoInput } from "@/utils/inputs/get-5226-indice-consulta-realizada-por-segmento-cadastro-positivo.input";
import { get5227IndicePontualidadePagamentoCadastroPositivoInput } from "@/utils/inputs/get-5227-indice-pontualidade-pagamento-cadastro-positivo.input";
import { get5193IndiceRelacionamentoMercadoPJInput } from "@/utils/inputs/get-5193-indice-relacionamento-mercado-pj.input";
import { get5263InscricaoEstadualInput } from "@/utils/inputs/get-5263-inscricao-estadual.input";
import { get5249InsumoGastoEstimadoPJAtualizadoInput } from "@/utils/inputs/get-5249-insumo-gasto-estimado-pj-atualizado.input";
import { get5257InsumoHistoricoOperacaoSCRInput } from "@/utils/inputs/get-5257-insumo-historico-operacao-scr.input";
import { get5179LimiteCreditoPJInput } from "@/utils/inputs/get-5179-limite-credito-pj.input";
import { get5225MovimentacaoCadastroPositivoInput } from "@/utils/inputs/get-5225-movimentacao-cadastro-positivo.input";
import { get5229ScorePJInput } from "@/utils/inputs/get-5229-score-pj.input";
import { get5247ScorePJMEIInput } from "@/utils/inputs/get-5247-score-pj-mei.input";
import { get5245ScoreRecuperacaoPJInput } from "@/utils/inputs/get-5245-score-recuperacao-pj.input";
import { get78SPCScore12MesesInput } from "@/utils/inputs/get-78-spc-score-12-meses.input";
import { get77SPCScore3MesesInput } from "@/utils/inputs/get-77-spc-score-3-meses.input";
import { get5240InsumoHistoricoPagamentoSumarizadoInput } from "@/utils/inputs/get-5240-insumo-historico-pagamento-sumarizado.input";
import { get5260InsumoHistoricoOperacoesAgronegocioB3Input } from "@/utils/inputs/get-5260-insumo-historico-operacoes-agronegocio-B3.input";
import { get5184RiscoCreditoPJInput } from "@/utils/inputs/get-5184-risco-credito-pj.input";
import { get5265InsumoParticipacaoMercadoCapitaisInput } from "@/utils/inputs/get-5265-insumo-participacao-mercado-capitais.input";
import { get5267QuantidadeFuncionarioInput } from "@/utils/inputs/get-5267-quantidade-funcionario.input";
import { get5186QuadroSocialMaisCompletoPjInput } from "@/utils/inputs/get-5186-quadro-social-mais-completo-pj.input";
import { get5258ParticipacaoEmpresaInput } from "@/utils/inputs/get-5258-participacao-empresa.input";

export async function spc337UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos = new Set([
    5244, 5178, 5185, 5241, 5224, 5226, 5227, 5193, 5263, 5249, 5257, 5179,
    5225, 5229, 5247, 5245, 78, 77, 5183, 5240, 5260, 5184, 5265, 5267, 5186,
    5258,
  ]);

  const invalidInsumos = insumos.filter(
    (insumo) => !allowedInsumos.has(insumo),
  );

  if (invalidInsumos.length > 0) {
    throw new FriendlyError({
      message: `Insumos inválidos: ${invalidInsumos.join(", ")}`,
      context: "spc325UseCase.validation",
      code: 400,
    });
  }

  try {
    const { xml, json } = await HTTPSPCService({
      productCode: 337,
      tipoConsumidor: getTipoConsumidor(typeDocument),
      document,
      insumos,
    });

    return json
    
    return {
      // DEFAULT

      // 18
      acao: get18AcaoInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].acao),

      // 49
      administrador: get49AdministradorInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"].administrador,
      ),

      // 19
      "alerta-documento": get19AlertaDocumentoInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["alerta-documento"],
      ),

      // 63

      // 64
      "atividade-empresa": get64AtividadeEmpresaInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["atividade-empresa"],
      ),

      // 48
      "capital-social": get48CapitalSocialInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["capital-social"],
      ),

      // 15
      ccf: get15CCFInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].ccf),

      // 21
      "consulta-realizada": get21ConsultaRealizadaInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["consulta-realizada"],
      ),

      // 1
      consumidor: get1ConsumidorInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"].consumidor,
        typeDocument,
      ),

      // 16
      "contra-ordem": get16ContraOrdemInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["contra-ordem"],
      ),

      // 27
      "contra-ordem-documento-diferente":
        get27ContraOrdemDocumentoDiferenteInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "contra-ordem-documento-diferente"
          ],
        ),

      // 61

      // 5233
      "dados-adicionais-de-contato": get5233DadosAdicionaisDeContatoInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"][
          "dados-adicionais-de-contato"
        ],
      ),

      // 65

      // 2
      "grafia-pj": get2GrafiaPJInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["grafia-pj"],
      ),

      // 52

      // 47

      // 67
      "informacao-poder-judiciario": get67InformacaoPoderJudiciarioInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"][
          "informacao-poder-judiciario"
        ],
      ),

      // 46

      // 58

      // 55
      "pendencia-financeira": get55PendenciaFinanceiraInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["pendencia-financeira"],
      ),

      // 66

      // 17
      protesto: get17ProtestoInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"].protesto,
      ),

      // 54

      // 50

      // 53

      // 23
      socio: get23SocioInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"].socio,
      ),

      // 8
      spc: get8SPCInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].spc),

      // 44
      "telefone-vinculado-assinante-consultado":
        get44TelefoneVinculadoAssinanteConsultadoInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "telefone-vinculado-assinante-consultado"
          ],
        ),

      // 51

      // OPCIONAL

      // 5244
      ...(insumos.includes(5244) && {
        "divida-publica-cadin": get5244DividaPublicaCadinInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["divida-publica-cadin"],
        ),
      }),

      // 5178
      ...(insumos.includes(5178) && {
        "faturamento-presumido": get5178FaturamentoPresumidoInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "faturamento-presumido"
          ],
        ),
      }),

      // 5185
      ...(insumos.includes(5185) && {
        "gasto-estimado-pj": get5185GastoEstimadoPJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["gasto-estimado-pj"],
        ),
      }),

      // 5241
      ...(insumos.includes(5241) && {
        "grupo-economico": get5241GrupoEconomicoInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["grupo-economico"],
        ),
      }),

      // 5224
      ...(insumos.includes(5224) && {
        "indice-comportamento-gastos-cadastro-positivo":
          get5224IndiceComportamentoGastosCadastroPositivoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "indice-comportamento-gastos-cadastro-positivo"
            ],
          ),
      }),

      // 5226
      ...(insumos.includes(5226) && {
        "indice-consulta-realizada-por-segmento-cadastro-positivo":
          get5226IndiceConsultaRealizadaPorSegmentoCadastroPositivoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "indice-consulta-realizada-por-segmento-cadastro-positivo"
            ],
          ),
      }),

      // 5227
      ...(insumos.includes(5227) && {
        "indice-pontualidade-pagamento-cadastro-positivo":
          get5227IndicePontualidadePagamentoCadastroPositivoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "indice-pontualidade-pagamento-cadastro-positivo"
            ],
          ),
      }),

      // 5193
      ...(insumos.includes(5193) && {
        "indice-relacionamento-mercado-pj":
          get5193IndiceRelacionamentoMercadoPJInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "indice-relacionamento-mercado-pj"
            ],
          ),
      }),

      // 5263
      ...(insumos.includes(5263) && {
        "inscricao-estadual": get5263InscricaoEstadualInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["inscricao-estadual"],
        ),
      }),

      // 5249
      ...(insumos.includes(5249) && {
        "insumo-gasto-estimado-pj-atualizado":
          get5249InsumoGastoEstimadoPJAtualizadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "insumo-gasto-estimado-pj-atualizado"
            ],
          ),
      }),

      // 5257
      ...(insumos.includes(5257) && {
        "insumo-historico-operacao-scr": get5257InsumoHistoricoOperacaoSCRInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "insumo-historico-operacao-scr"
          ],
        ),
      }),

      // 5179
      ...(insumos.includes(5179) && {
        "limite-credito-pj": get5179LimiteCreditoPJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["limite-credito-pj"],
        ),
      }),

      // 5225
      ...(insumos.includes(5225) && {
        "movimentacao-cadastro-positivo":
          get5225MovimentacaoCadastroPositivoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "movimentacao-cadastro-positivo"
            ],
          ),
      }),

      // 5229
      ...(insumos.includes(5229) && {
        "score-pj": get5229ScorePJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-pj"],
        ),
      }),

      // 5247
      ...(insumos.includes(5247) && {
        "score-pj-mei": get5247ScorePJMEIInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-pj-mei"],
        ),
      }),

      // 5245
      ...(insumos.includes(5245) && {
        "score-recuperacao-pj": get5245ScoreRecuperacaoPJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-recuperacao-pj"],
        ),
      }),

      // 78
      ...(insumos.includes(78) && {
        "spc-score-12-meses": get78SPCScore12MesesInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["spc-score-12-meses"],
        ),
      }),

      // 77
      ...(insumos.includes(77) && {
        "spc-score-3-meses": get77SPCScore3MesesInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["spc-score-3-meses"],
        ),
      }),

      // 5183
      ...(insumos.includes(5183) && {}),

      // 5240
      ...(insumos.includes(5240) && {
        "insumo-historico-pagamento-sumarizado":
          get5240InsumoHistoricoPagamentoSumarizadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "insumo-historico-pagamento-sumarizado"
            ],
          ),
      }),

      // 5260
      ...(insumos.includes(5260) && {
        "insumo-historico-operacoes-agronegocio-B3":
          get5260InsumoHistoricoOperacoesAgronegocioB3Input(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "insumo-historico-operacoes-agronegocio-B3"
            ],
          ),
      }),

      // 5184
      ...(insumos.includes(5184) && {
        "risco-credito-pj": get5184RiscoCreditoPJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["risco-credito-pj"],
        ),
      }),

      // 5265
      ...(insumos.includes(5265) && {
        "insumo-participacao-mercado-capitais":
          get5265InsumoParticipacaoMercadoCapitaisInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "insumo-participacao-mercado-capitais"
            ],
          ),
      }),

      // 5267
      ...(insumos.includes(5267) && {
        "quantidade-funcionario": get5267QuantidadeFuncionarioInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "quantidade-funcionario"
          ],
        ),
      }),

      // 5186
      ...(insumos.includes(5186) && {
        "quadro-social-mais-completo-pj":
          get5186QuadroSocialMaisCompletoPjInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "quadro-social-mais-completo-pj"
            ],
          ),
      }),

      // 5258
      ...(insumos.includes(5258) && {
        "participacao-empresa": get5258ParticipacaoEmpresaInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["participacao-empresa"],
        ),
      }),
    };
  } catch (error) {
    throw new FriendlyError({
      message: AppError.GET_ALL_BRANDS_ERROR,
      originalError: error,
      context: "spcUseCase",
      code: 400,
    });
  }
}
