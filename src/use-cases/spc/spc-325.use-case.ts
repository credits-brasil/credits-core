import axios from "axios";
import { parseStringPromise } from "xml2js";

import { AppError } from "@/constants/spc";

import { buildSPCSoapBody, FriendlyError, getTipoConsumidor } from "@/utils";

import { SoapEnvelope } from "@/interfaces";
import { get3082SPCObitoInput } from "@/utils/inputs/get-3082-spc-obito.input";
import { get5268ValidaCelularInput } from "@/utils/inputs/get-5268-valida-celular.input";
import { HTTPSPCService } from "@/services";
import { get5259ScoreSimilaridadeCadastralInput } from "@/utils/inputs/get-5259-score-similaridade-cadastral.input";
import { get5228ScoreCadastroPositivoInput } from "@/utils/inputs/get-5228-score-cadastro-positivo.input";
import { get5232PerfilComportamentalInput } from "@/utils/inputs/get-5232-perfil-comportamental.input";
import { get5142LimiteCreditoSugeridoInput } from "@/utils/inputs/get-5142-limite-credito-sugerido.input";
import { get5244DividaPublicaCadinInput } from "@/utils/inputs/get-5244-divida-publica-cadin.input";
import { get5194ComprometimentoRendaMensalPfInput } from "@/utils/inputs/get-5194-comprometimento-renda-mensal-pf.input";
import { get5195CollectionScorePlusInput } from "@/utils/inputs/get-5195-collection-score-plus.input";
import { get5180AlertaIdentidadeInput } from "@/utils/inputs/get-5180-alerta-identidade.input";
import { get5262AlertaIdentidadeFraudeInput } from "@/utils/inputs/get-5262-alerta-identidade-fraude.input";
import { get5266AnaliseDocumentosSPCInput } from "@/utils/inputs/get-5266-analise-documentos-spc.input";
import { get5178FaturamentoPresumidoInput } from "@/utils/inputs/get-5178-faturamento-presumido.input";
import { get5185GastoEstimadoPJInput } from "@/utils/inputs/get-5185-gasto-estimado-pj.input";
import { get5241GrupoEconomicoInput } from "@/utils/inputs/get-5241-grupo-economico.input";
import { get5224IndiceComportamentoGastosCadastroPositivoInput } from "@/utils/inputs/get-5224-indice-comportamento-gastos-cadastro-positivo.input";
import { get5227IndicePontualidadePagamentoCadastroPositivoInput } from "@/utils/inputs/get-5227-indice-pontualidade-pagamento-cadastro-positivo.input";
import { get5179LimiteCreditoPJInput } from "@/utils/inputs/get-5179-limite-credito-pj.input";
import { get5184RiscoCreditoPJInput } from "@/utils/inputs/get-5184-risco-credito-pj.input";
import { get5229ScorePJInput } from "@/utils/inputs/get-5229-score-pj.input";
import { get5245ScoreRecuperacaoPJInput } from "@/utils/inputs/get-5245-score-recuperacao-pj.input";
import { get64AtividadeEmpresaInput } from "@/utils/inputs/get-64-atividade-empresa.input";
import { get48CapitalSocialInput } from "@/utils/inputs/get-48-capital-social.input";
import { get21ConsultaRealizadaInput } from "@/utils/inputs/get-21-consulta-realizada.input";
import { get1ConsumidorInput } from "@/utils/inputs/get-1-consumidor.input";
import { get5233DadosAdicionaisDeContatoInput } from "@/utils/inputs/get-5233-dados-adicionais-de-contato.input";
import { get55PendenciaFinanceiraInput } from "@/utils/inputs/get-55-pendencia-financeira.input";
import { get17ProtestoInput } from "@/utils/inputs/get-17-protesto.input";
import { get8SPCInput } from "@/utils/inputs/get-8-spc.input";
import { get10UltimoTelefoneInformadoInput } from "@/utils/inputs/get-10-ultimo-telefone-informado.input";
import { get12UltimoEnderecoInformadoInput } from "@/utils/inputs/get-12-ultimo-endereco-informado.input";
import { get19AlertaDocumentoInput } from "@/utils/inputs/get-19-alerta-documento.input";
import { get15CCFInput } from "@/utils/inputs/get-15-ccf.input";
import { get68ChequeConsultaOnlineSRSInput } from "@/utils/inputs/get-68-cheque-consulta-online-srs.input";
import { get9ChequeLojistaInput } from "@/utils/inputs/get-9-cheque-lojista.input";
import { get69ChequeSemFundoVarejoInput } from "@/utils/inputs/get-69-cheque-sem-fundo-varejo.input";
import { get16ContraOrdemInput } from "@/utils/inputs/get-16-contra-ordem.input";
import { get27ContraOrdemDocumentoDiferenteInput } from "@/utils/inputs/get-27-contra-ordem-documento-diferente.input";
import { get22ContumaciaInput } from "@/utils/inputs/get-22-contumacia.input";
import { get20CreditoConcedidoInput } from "@/utils/inputs/get-20-credito-concedido.input";
import { get28DadosAgenciaBancariaInput } from "@/utils/inputs/get-28-dados-agencia-bancaria.input";
import { get4EnderecoCepConsultadoInput } from "@/utils/inputs/get-4-endereco-cep-consultado.input";
import { get2GrafiaPJInput } from "@/utils/inputs/get-2-grafia-pj.input";
import { get67InformacaoPoderJudiciarioInput } from "@/utils/inputs/get-67-informacao-poder-judiciario.input";
import { get3TelefoneConsultadoInput } from "@/utils/inputs/get-3-telefone-consultado.input";
import { get44TelefoneVinculadoAssinanteConsultadoInput } from "@/utils/inputs/get-44-telefone-vinculado-assinante-consultado.input";
import { get18AcaoInput } from "@/utils/inputs/get-18-acao.input";
import { get5240InsumoHistoricoPagamentoSumarizadoInput } from "@/utils/inputs/get-5240-insumo-historico-pagamento-sumarizado.input";
import { get5226IndiceConsultaRealizadaPorSegmentoCadastroPositivoInput } from "@/utils/inputs/get-5226-indice-consulta-realizada-por-segmento-cadastro-positivo.input";
import { get5225MovimentacaoCadastroPositivoInput } from "@/utils/inputs/get-5225-movimentacao-cadastro-positivo.input";
import { get5249InsumoGastoEstimadoPJAtualizadoInput } from "@/utils/inputs/get-5249-insumo-gasto-estimado-pj-atualizado.input";
import { get5247ScorePJMEIInput } from "@/utils/inputs/get-5247-score-pj-mei.input";
import { get23SocioInput } from "@/utils/inputs/get-23-socio.input";
import { get5258ParticipacaoEmpresaInput } from "@/utils/inputs/get-5258-participacao-empresa.input";
import { get5186QuadroSocialMaisCompletoPjInput } from "@/utils/inputs/get-5186-quadro-social-mais-completo-pj.input";
import { get24ParticipacaoEmpresaInput } from "@/utils/inputs/get-24-participacao-empresa.input";
import { get49AdministradorInput } from "@/utils/inputs/get-49-administrador.input";
import { get5193IndiceRelacionamentoMercadoPJInput } from "@/utils/inputs/get-5193-indice-relacionamento-mercado-pj.input";
import { get5267QuantidadeFuncionarioInput } from "@/utils/inputs/get-5267-quantidade-funcionario.input";
import { get5265InsumoParticipacaoMercadoCapitaisInput } from "@/utils/inputs/get-5265-insumo-participacao-mercado-capitais.input";
import { get5256InsumoOperacaoSCRInput } from "@/utils/inputs/get-5256-insumo-operacao-scr.input";
import { get5257InsumoHistoricoOperacaoSCRInput } from "@/utils/inputs/get-5257-insumo-historico-operacao-scr.input";
import { get5260InsumoHistoricoOperacoesAgronegocioB3Input } from "@/utils/inputs/get-5260-insumo-historico-operacoes-agronegocio-B3.input";
import { get78SPCScore12MesesInput } from "@/utils/inputs/get-78-spc-score-12-meses.input";
import { get5261ScoreAgroInput } from "@/utils/inputs/get-5261-score-agro.input";
import { get77SPCScore3MesesInput } from "@/utils/inputs/get-77-spc-score-3-meses.input";
import { get5254ScoreMaisPositivoVarejoInput } from "@/utils/inputs/get-5254-insumo-score-mais-positivo-varejo.input";
import { get5097RendaPresumidaPFInput } from "@/utils/inputs/get-5097-insumo-renda-presumida-pf.input";
import { get5253ScoreMaisPositivoFinanceiroInput } from "@/utils/inputs/get-5253-insumo-score-mais-positivo-financeiro.input";
import { get5255PEPInput } from "@/utils/inputs/get-5255-insumo-pep.input";
import { get5264AlertaCPFSuspeitoInput } from "@/utils/inputs/get-5264-insumo_alerta-cpf-suspeito.input";
import { get5239ClassificacaoRiscoDebitosAtivosInput } from "@/utils/inputs/get-5239-insumo-classificacao-risco-debitos-ativos.input";
import { get5122RendaPresumidaSPCInput } from "@/utils/inputs/get-5122-renda-presumida-spc.input";

export async function spc325UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos = {
    CPF: new Set([
      5262, 5180, 5266, 5195, 5194, 5241, 5224, 5227, 5142, 5232, 5228, 5259,
      3082, 5268, 5240, 5226, 5225, 5249, 5256, 5257, 5260, 5261, 18, 5254,
      5097, 5253, 5255, 5264, 5239, 77, 5122,
    ]),
    CNPJ: new Set([
      5244, 5178, 5185, 5241, 5224, 5227, 5179, 5184, 5229, 5245, 5240, 5226,
      5225, 5249, 5256, 5257, 5261, 18, 78, 5247, 5265, 5267, 5193, 49, 24,
      5186, 5258, 23, 77,
    ]),
  } as const;

  const invalidInsumos = insumos.filter(
    (insumo) => !allowedInsumos[typeDocument].has(insumo),
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
      productCode: 325,
      tipoConsumidor: getTipoConsumidor(typeDocument),
      document,
      insumos,
    });

    console.log( json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "ultimo-endereco-informado"
            ], 'json')

    return typeDocument === "CPF"
      ? {
          // DEFAULT

          // 19
          "alerta-documento": get19AlertaDocumentoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["alerta-documento"],
          ),

          // 15
          ccf: get15CCFInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].ccf),

          // 68
          "cheque-consulta-online-srs": get68ChequeConsultaOnlineSRSInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "cheque-consulta-online-srs"
            ],
          ),

          // 9
          "cheque-lojista": get9ChequeLojistaInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["cheque-lojista"],
          ),

          // 69
          "cheque-sem-fundo-varejo": get69ChequeSemFundoVarejoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "cheque-sem-fundo-varejo"
            ],
          ),

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

          // 22
          contumacia: get22ContumaciaInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["contumacia"],
          ),

          // 20
          "credito-concedido": get20CreditoConcedidoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["credito-concedido"],
          ),

          // 5233
          "dados-adicionais-de-contato": get5233DadosAdicionaisDeContatoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "dados-adicionais-de-contato"
            ],
          ),

          // 28
          "dados-agencia-bancaria": get28DadosAgenciaBancariaInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "dados-agencia-bancaria"
            ],
          ),

          // 4
          "endereco-cep-consultado": get4EnderecoCepConsultadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "endereco-cep-consultado"
            ],
          ),

          // 2
          "grafia-pj": get2GrafiaPJInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["grafia-pj"],
          ),

          // 67
          "informacao-poder-judiciario": get67InformacaoPoderJudiciarioInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "informacao-poder-judiciario"
            ],
          ),

          // 55
          "pendencia-financeira": get55PendenciaFinanceiraInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "pendencia-financeira"
            ],
          ),

          // 17
          protesto: get17ProtestoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"].protesto,
          ),

          // 8
          spc: get8SPCInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].spc),

          // 3
          "telefone-consultado": get3TelefoneConsultadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "telefone-consultado"
            ],
          ),

          // 44
          "telefone-vinculado-assinante-consultado":
            get44TelefoneVinculadoAssinanteConsultadoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "telefone-vinculado-assinante-consultado"
              ],
            ),

          // 12
          // "ultimo-endereco-informado": get12UltimoEnderecoInformadoInput(
          //   json["S:Envelope"]["S:Body"]["ns2:resultado"][
          //     "ultimo-endereco-informado"
          //   ],
          // ),

          // 10
          // "ultimo-telefone-informado": get10UltimoTelefoneInformadoInput(
          //   json["S:Envelope"]["S:Body"]["ns2:resultado"][
          //     "ultimo-telefone-informado"
          //   ],
          // ),

          // OPCIONAL

          // 5262
          ...(insumos.includes(5262) && {
            "alerta-identidade-fraude": get5262AlertaIdentidadeFraudeInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "alerta-identidade-fraude"
              ],
            ),
          }),

          // 5180
          ...(insumos.includes(5180) && {
            "alerta-identidade": get5180AlertaIdentidadeInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "alerta-identidade"
              ],
            ),
          }),

          // 5266
          ...(insumos.includes(5266) && {
            "analise-documentos-spc": get5266AnaliseDocumentosSPCInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "analise-documentos-spc"
              ],
            ),
          }),

          // 5195
          ...(insumos.includes(5195) && {
            "collection-score-plus": get5195CollectionScorePlusInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "collection-score-plus"
              ],
            ),
          }),

          // 5194
          ...(insumos.includes(5194) && {
            "comprometimento-renda-mensal-pf":
              get5194ComprometimentoRendaMensalPfInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "comprometimento-renda-mensal-pf"
                ],
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

          // 5227
          ...(insumos.includes(5227) && {
            "indice-pontualidade-pagamento-cadastro-positivo":
              get5227IndicePontualidadePagamentoCadastroPositivoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "indice-pontualidade-pagamento-cadastro-positivo"
                ],
              ),
          }),

          // 5142
          ...(insumos.includes(5142) && {
            "limite-credito-sugerido": get5142LimiteCreditoSugeridoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "limite-credito-sugerido"
              ],
            ),
          }),

          //  5232
          ...(insumos.includes(5232) && {
            "perfil-comportamental": get5232PerfilComportamentalInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "perfil-comportamental"
              ],
            ),
          }),

          //  5228
          ...(insumos.includes(5228) && {
            "score-cadastro-positivo": get5228ScoreCadastroPositivoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "score-cadastro-positivo"
              ],
            ),
          }),

          //  5259
          ...(insumos.includes(5259) && {
            "score-similaridade-cadastral":
              get5259ScoreSimilaridadeCadastralInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "score-similaridade-cadastral"
                ],
              ),
          }),

          //  3082
          ...(insumos.includes(3082) && {
            "spc-obito": get3082SPCObitoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["spc-obito"],
            ),
          }),

          //  5268
          ...(insumos.includes(5268) && {
            "valida-celular": get5268ValidaCelularInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["valida-celular"],
            ),
          }),

          // 5240
          ...(insumos.includes(5240) && {
            "insumo-historico-pagamento-sumarizado":
              get5240InsumoHistoricoPagamentoSumarizadoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-historico-pagamento-sumarizado"
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

          // 5225
          ...(insumos.includes(5225) && {
            "movimentacao-cadastro-positivo":
              get5225MovimentacaoCadastroPositivoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "movimentacao-cadastro-positivo"
                ],
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

          // 5256
          ...(insumos.includes(5256) && {
            "insumo-operacao-scr": get5256InsumoOperacaoSCRInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "insumo-operacao-scr"
              ],
            ),
          }),

          // 5257
          ...(insumos.includes(5257) && {
            "insumo-historico-operacao-scr":
              get5257InsumoHistoricoOperacaoSCRInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-historico-operacao-scr"
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

          // 5261
          ...(insumos.includes(5261) && {
            "score-agro": get5261ScoreAgroInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-agro"],
            ),
          }),

          // 18
          ...(insumos.includes(18) && {
            acao: get18AcaoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"].acao,
            ),
          }),

          // 5254
          ...(insumos.includes(5254) && {
            "insumo-score-mais-positivo-varejo":
              get5254ScoreMaisPositivoVarejoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-score-mais-positivo-varejo"
                ],
              ),
          }),

          // 5097
          ...(insumos.includes(5097) && {
            "insumo-renda-presumida-pf": get5097RendaPresumidaPFInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "insumo-renda-presumida-pf"
              ],
            ),
          }),

          // 5253
          ...(insumos.includes(5253) && {
            "insumo-score-mais-positivo-financeiro":
              get5253ScoreMaisPositivoFinanceiroInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-score-mais-positivo-financeiro"
                ],
              ),
          }),

          // 5255
          ...(insumos.includes(5255) && {
            "insumo-pep": get5255PEPInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["insumo-pep"],
            ),
          }),

          // 5264
          ...(insumos.includes(5264) && {
            "insumo_alerta-cpf-suspeito": get5264AlertaCPFSuspeitoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "insumo_alerta-cpf-suspeito"
              ],
            ),
          }),

          // 5239
          ...(insumos.includes(5239) && {
            "insumo-classificacao-risco-debitos-ativos":
              get5239ClassificacaoRiscoDebitosAtivosInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-classificacao-risco-debitos-ativos"
                ],
              ),
          }),

          // 77
          ...(insumos.includes(77) && {
            "spc-score-3-meses": get77SPCScore3MesesInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "spc-score-3-meses"
              ],
            ),
          }),

          // 5122
          ...(insumos.includes(5122) && {
            "renda-presumida-spc": get5122RendaPresumidaSPCInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "renda-presumida-spc"
              ],
            ),
          }),
        }
      : {
          // DEFAULT

          // 19
          "alerta-documento": get19AlertaDocumentoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["alerta-documento"],
          ),

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

          // 68
          "cheque-consulta-online-srs": get68ChequeConsultaOnlineSRSInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "cheque-consulta-online-srs"
            ],
          ),

          // 9
          "cheque-lojista": get9ChequeLojistaInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["cheque-lojista"],
          ),

          // 69
          "cheque-sem-fundo-varejo": get69ChequeSemFundoVarejoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "cheque-sem-fundo-varejo"
            ],
          ),

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

          // 22
          contumacia: get22ContumaciaInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["contumacia"],
          ),

          // 20
          "credito-concedido": get20CreditoConcedidoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["credito-concedido"],
          ),

          // 5233
          "dados-adicionais-de-contato": get5233DadosAdicionaisDeContatoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "dados-adicionais-de-contato"
            ],
          ),

          // 28
          "dados-agencia-bancaria": get28DadosAgenciaBancariaInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "dados-agencia-bancaria"
            ],
          ),

          // 4
          "endereco-cep-consultado": get4EnderecoCepConsultadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "endereco-cep-consultado"
            ],
          ),

          // 2
          "grafia-pj": get2GrafiaPJInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"]["grafia-pj"],
          ),

          // 67
          "informacao-poder-judiciario": get67InformacaoPoderJudiciarioInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "informacao-poder-judiciario"
            ],
          ),

          // 55
          "pendencia-financeira": get55PendenciaFinanceiraInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "pendencia-financeira"
            ],
          ),

          // 17
          protesto: get17ProtestoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"].protesto,
          ),

          // 8
          spc: get8SPCInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].spc),

          // 3
          "telefone-consultado": get3TelefoneConsultadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "telefone-consultado"
            ],
          ),

          // 44
          "telefone-vinculado-assinante-consultado":
            get44TelefoneVinculadoAssinanteConsultadoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "telefone-vinculado-assinante-consultado"
              ],
            ),

          // 12
          "ultimo-endereco-informado": get12UltimoEnderecoInformadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "ultimo-endereco-informado"
            ],
          ),

          // 10
          "ultimo-telefone-informado": get10UltimoTelefoneInformadoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "ultimo-telefone-informado"
            ],
          ),

          // OPCIONAL

          // 5244
          ...(insumos.includes(5244) && {
            "divida-publica-cadin": get5244DividaPublicaCadinInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "divida-publica-cadin"
              ],
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
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "gasto-estimado-pj"
              ],
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

          // 5227
          ...(insumos.includes(5227) && {
            "indice-pontualidade-pagamento-cadastro-positivo":
              get5227IndicePontualidadePagamentoCadastroPositivoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "indice-pontualidade-pagamento-cadastro-positivo"
                ],
              ),
          }),

          // 5179
          ...(insumos.includes(5179) && {
            "limite-credito-pj": get5179LimiteCreditoPJInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "limite-credito-pj"
              ],
            ),
          }),

          // 5184
          ...(insumos.includes(5184) && {
            "risco-credito-pj": get5184RiscoCreditoPJInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["risco-credito-pj"],
            ),
          }),

          // 5229
          ...(insumos.includes(5229) && {
            "score-pj": get5229ScorePJInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-pj"],
            ),
          }),

          // 5245
          ...(insumos.includes(5245) && {
            "score-recuperacao-pj": get5245ScoreRecuperacaoPJInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "score-recuperacao-pj"
              ],
            ),
          }),

          // 5240
          ...(insumos.includes(5240) && {
            "insumo-historico-pagamento-sumarizado":
              get5240InsumoHistoricoPagamentoSumarizadoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-historico-pagamento-sumarizado"
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

          // 5225
          ...(insumos.includes(5225) && {
            "movimentacao-cadastro-positivo":
              get5225MovimentacaoCadastroPositivoInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "movimentacao-cadastro-positivo"
                ],
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

          // 5256
          ...(insumos.includes(5256) && {
            "insumo-operacao-scr": get5256InsumoOperacaoSCRInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "insumo-operacao-scr"
              ],
            ),
          }),

          // 5257
          ...(insumos.includes(5257) && {
            "insumo-historico-operacao-scr":
              get5257InsumoHistoricoOperacaoSCRInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "insumo-historico-operacao-scr"
                ],
              ),
          }),

          // 5261
          ...(insumos.includes(5261) && {
            "score-agro": get5261ScoreAgroInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-agro"],
            ),
          }),

          // 18
          ...(insumos.includes(18) && {
            acao: get18AcaoInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"].acao,
            ),
          }),

          // 78
          ...(insumos.includes(78) && {
            "spc-score-12-meses": get78SPCScore12MesesInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "spc-score-12-meses"
              ],
            ),
          }),

          // 5247
          ...(insumos.includes(5247) && {
            "score-pj-mei": get5247ScorePJMEIInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-pj-mei"],
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

          // 5193
          ...(insumos.includes(5193) && {
            "indice-relacionamento-mercado-pj":
              get5193IndiceRelacionamentoMercadoPJInput(
                json["S:Envelope"]["S:Body"]["ns2:resultado"][
                  "indice-relacionamento-mercado-pj"
                ],
              ),
          }),

          // 49
          ...(insumos.includes(49) && {
            administrador: get49AdministradorInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"].administrador,
            ),
          }),

          // 24
          ...(insumos.includes(24) && {
            "participacao-empresa": get24ParticipacaoEmpresaInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "participacao-empresa"
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
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "participacao-empresa"
              ],
            ),
          }),

          // 23
          ...(insumos.includes(23) && {
            socio: get23SocioInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"].socio,
            ),
          }),

          // 77
          ...(insumos.includes(77) && {
            "spc-score-3-meses": get77SPCScore3MesesInput(
              json["S:Envelope"]["S:Body"]["ns2:resultado"][
                "spc-score-3-meses"
              ],
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
