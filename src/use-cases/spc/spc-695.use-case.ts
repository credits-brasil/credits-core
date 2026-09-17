import { FriendlyError, getTipoConsumidor } from "@/utils";

import { get5268ValidaCelularInput } from "@/utils/inputs/get-5268-valida-celular.input";
import { HTTPSPCService } from "@/services";
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
import { get19AlertaDocumentoInput } from "@/utils/inputs/get-19-alerta-documento.input";
import { get15CCFInput } from "@/utils/inputs/get-15-ccf.input";
import { get9ChequeLojistaInput } from "@/utils/inputs/get-9-cheque-lojista.input";
import { get69ChequeSemFundoVarejoInput } from "@/utils/inputs/get-69-cheque-sem-fundo-varejo.input";
import { get20CreditoConcedidoInput } from "@/utils/inputs/get-20-credito-concedido.input";
import { get28DadosAgenciaBancariaInput } from "@/utils/inputs/get-28-dados-agencia-bancaria.input";
import { get4EnderecoCepConsultadoInput } from "@/utils/inputs/get-4-endereco-cep-consultado.input";
import { get67InformacaoPoderJudiciarioInput } from "@/utils/inputs/get-67-informacao-poder-judiciario.input";
import { get3TelefoneConsultadoInput } from "@/utils/inputs/get-3-telefone-consultado.input";
import { get44TelefoneVinculadoAssinanteConsultadoInput } from "@/utils/inputs/get-44-telefone-vinculado-assinante-consultado.input";
import { get18AcaoInput } from "@/utils/inputs/get-18-acao.input";
import { get49AdministradorInput } from "@/utils/inputs/get-49-administrador.input";
import { get5256InsumoOperacaoSCRInput } from "@/utils/inputs/get-5256-insumo-operacao-scr.input";
import { get5257InsumoHistoricoOperacaoSCRInput } from "@/utils/inputs/get-5257-insumo-historico-operacao-scr.input";
import { get77SPCScore3MesesInput } from "@/utils/inputs/get-77-spc-score-3-meses.input";
import { get5253ScoreMaisPositivoFinanceiroInput } from "@/utils/inputs/get-5253-insumo-score-mais-positivo-financeiro.input";
import { get5264AlertaCPFSuspeitoInput } from "@/utils/inputs/get-5264-insumo_alerta-cpf-suspeito.input";
import { get5239ClassificacaoRiscoDebitosAtivosInput } from "@/utils/inputs/get-5239-insumo-classificacao-risco-debitos-ativos.input";
import { get5122RendaPresumidaSPCInput } from "@/utils/inputs/get-5122-renda-presumida-spc.input";

function convertSPCInput<Input, Args extends unknown[], Output>(
  converter: (input: Input, ...args: Args) => Output,
  input: Input | null | undefined | "",
  ...args: Args
): Output | null {
  // Blocos ausentes ou tags vazias no SOAP não representam quantidade zero.
  if (input == null || input === "") return null;

  return converter(input, ...args);
}

export async function spc695UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos: Record<"CPF" | "CNPJ", number[]> = {
    CPF: [
      5262, 5180, 5266, 5195, 5194, 5241, 5224, 5227, 5142, 5232, 5228, 5268,
      5256, 5257, 18, 5253, 5264, 5239, 77, 5122,
    ],
    CNPJ: [
      5244, 5178, 5185, 5241, 5224, 5227, 5229, 5245, 5256, 5257, 18, 49, 77,
    ],
  } as const;

  const invalidInsumos = insumos.filter(
    (insumo) => !allowedInsumos[typeDocument].includes(insumo),
  );

  if (invalidInsumos.length > 0) {
    throw new FriendlyError({
      message: `Insumos inválidos: ${invalidInsumos.join(", ")}`,
      context: "spc695UseCase.validation",
      code: 400,
    });
  }

  try {
    const { json } = await HTTPSPCService({
      productCode: 695,
      tipoConsumidor: getTipoConsumidor(typeDocument),
      document,
      insumos,
    });
    const resultado = json?.["S:Envelope"]?.["S:Body"]?.["ns2:resultado"];

    if (!resultado || typeof resultado !== "object" || Array.isArray(resultado)) {
      throw new FriendlyError({
        message: "Resposta inválida do SPC Mais: resultado ausente ou inválido.",
        context: "spc695UseCase.response",
        code: 502,
      });
    }

    const result =
      typeDocument === "CPF"
        ? {
            "alerta-documento": convertSPCInput(
              get19AlertaDocumentoInput,
              resultado["alerta-documento"],
            ),
            ccf: convertSPCInput(get15CCFInput, resultado.ccf),

            "cheque-lojista": convertSPCInput(
              get9ChequeLojistaInput,
              resultado["cheque-lojista"],
            ),
            "cheque-sem-fundo-varejo": convertSPCInput(
              get69ChequeSemFundoVarejoInput,
              resultado["cheque-sem-fundo-varejo"],
            ),
            "consulta-realizada": convertSPCInput(
              get21ConsultaRealizadaInput,
              resultado["consulta-realizada"],
            ),
            consumidor: convertSPCInput(
              get1ConsumidorInput,
              resultado.consumidor, typeDocument,
            ),

            "credito-concedido": convertSPCInput(
              get20CreditoConcedidoInput,
              resultado["credito-concedido"],
            ),
            "dados-adicionais-de-contato": convertSPCInput(
              get5233DadosAdicionaisDeContatoInput,
              resultado["dados-adicionais-de-contato"],
            ),
            "dados-agencia-bancaria": convertSPCInput(
              get28DadosAgenciaBancariaInput,
              resultado["dados-agencia-bancaria"],
            ),
            "endereco-cep-consultado": convertSPCInput(
              get4EnderecoCepConsultadoInput,
              resultado["endereco-cep-consultado"],
            ),

            "informacao-poder-judiciario": convertSPCInput(
              get67InformacaoPoderJudiciarioInput,
              resultado["informacao-poder-judiciario"],
            ),
            "pendencia-financeira": convertSPCInput(
              get55PendenciaFinanceiraInput,
              resultado["pendencia-financeira"],
            ),
            protesto: convertSPCInput(get17ProtestoInput, resultado.protesto),
            spc: convertSPCInput(get8SPCInput, resultado.spc),
            "telefone-consultado": convertSPCInput(
              get3TelefoneConsultadoInput,
              resultado["telefone-consultado"],
            ),
            "telefone-vinculado-assinante-consultado":
              convertSPCInput(
                get44TelefoneVinculadoAssinanteConsultadoInput,
                resultado["telefone-vinculado-assinante-consultado"],
              ),

            ...(insumos.includes(5262) && {
              "alerta-identidade-fraude": convertSPCInput(
                get5262AlertaIdentidadeFraudeInput,
                resultado["alerta-identidade-fraude"],
              ),
            }),
            ...(insumos.includes(5180) && {
              "alerta-identidade": convertSPCInput(
                get5180AlertaIdentidadeInput,
                resultado["alerta-identidade"],
              ),
            }),
            ...(insumos.includes(5266) && {
              "analise-documentos-spc": convertSPCInput(
                get5266AnaliseDocumentosSPCInput,
                resultado["analise-documentos-spc"],
              ),
            }),
            ...(insumos.includes(5195) && {
              "collection-score-plus": convertSPCInput(
                get5195CollectionScorePlusInput,
                resultado["collection-score-plus"],
              ),
            }),
            ...(insumos.includes(5194) && {
              "comprometimento-renda-mensal-pf":
                convertSPCInput(
                  get5194ComprometimentoRendaMensalPfInput,
                  resultado["comprometimento-renda-mensal-pf"],
                ),
            }),
            ...(insumos.includes(5241) && {
              "grupo-economico": convertSPCInput(
                get5241GrupoEconomicoInput,
                resultado["grupo-economico"],
              ),
            }),
            ...(insumos.includes(5224) && {
              "indice-comportamento-gastos-cadastro-positivo":
                convertSPCInput(
                  get5224IndiceComportamentoGastosCadastroPositivoInput,
                  resultado["indice-comportamento-gastos-cadastro-positivo"],
                ),
            }),
            ...(insumos.includes(5227) && {
              "indice-pontualidade-pagamento-cadastro-positivo":
                convertSPCInput(
                  get5227IndicePontualidadePagamentoCadastroPositivoInput,
                  resultado["indice-pontualidade-pagamento-cadastro-positivo"],
                ),
            }),
            ...(insumos.includes(5142) && {
              "limite-credito-sugerido": convertSPCInput(
                get5142LimiteCreditoSugeridoInput,
                resultado["limite-credito-sugerido"],
              ),
            }),
            ...(insumos.includes(5232) && {
              "perfil-comportamental": convertSPCInput(
                get5232PerfilComportamentalInput,
                resultado["perfil-comportamental"],
              ),
            }),
            ...(insumos.includes(5228) && {
              "score-cadastro-positivo": convertSPCInput(
                get5228ScoreCadastroPositivoInput,
                resultado["score-cadastro-positivo"],
              ),
            }),

            ...(insumos.includes(5268) && {
              "valida-celular": convertSPCInput(
                get5268ValidaCelularInput,
                resultado["valida-celular"],
              ),
            }),

            ...(insumos.includes(5256) && {
              "insumo-operacao-scr": convertSPCInput(
                get5256InsumoOperacaoSCRInput,
                resultado["insumo-operacao-scr"],
              ),
            }),
            ...(insumos.includes(5257) && {
              "insumo-historico-operacao-scr":
                convertSPCInput(
                  get5257InsumoHistoricoOperacaoSCRInput,
                  resultado["insumo-historico-operacao-scr"],
                ),
            }),

            ...(insumos.includes(18) && {
              acao: convertSPCInput(get18AcaoInput, resultado.acao),
            }),

            ...(insumos.includes(5253) && {
              "insumo-score-mais-positivo-financeiro":
                convertSPCInput(
                  get5253ScoreMaisPositivoFinanceiroInput,
                  resultado["insumo-score-mais-positivo-financeiro"],
                ),
            }),

            ...(insumos.includes(5264) && {
              "insumo_alerta-cpf-suspeito": convertSPCInput(
                get5264AlertaCPFSuspeitoInput,
                resultado["insumo_alerta-cpf-suspeito"],
              ),
            }),
            ...(insumos.includes(5239) && {
              "insumo-classificacao-risco-debitos-ativos":
                convertSPCInput(
                  get5239ClassificacaoRiscoDebitosAtivosInput,
                  resultado["insumo-classificacao-risco-debitos-ativos"],
                ),
            }),
            ...(insumos.includes(77) && {
              "spc-score-3-meses": convertSPCInput(
                get77SPCScore3MesesInput,
                resultado["spc-score-3-meses"],
              ),
            }),
            ...(insumos.includes(5122) && {
              "renda-presumida-spc": convertSPCInput(
                get5122RendaPresumidaSPCInput,
                resultado["renda-presumida-spc"],
              ),
            }),
          }
        : {
            "alerta-documento": convertSPCInput(
              get19AlertaDocumentoInput,
              resultado["alerta-documento"],
            ),
            "atividade-empresa": convertSPCInput(
              get64AtividadeEmpresaInput,
              resultado["atividade-empresa"],
            ),
            "capital-social": convertSPCInput(
              get48CapitalSocialInput,
              resultado["capital-social"],
            ),
            ccf: convertSPCInput(get15CCFInput, resultado.ccf),

            "cheque-lojista": convertSPCInput(
              get9ChequeLojistaInput,
              resultado["cheque-lojista"],
            ),
            "cheque-sem-fundo-varejo": convertSPCInput(
              get69ChequeSemFundoVarejoInput,
              resultado["cheque-sem-fundo-varejo"],
            ),
            "consulta-realizada": convertSPCInput(
              get21ConsultaRealizadaInput,
              resultado["consulta-realizada"],
            ),
            consumidor: convertSPCInput(
              get1ConsumidorInput,
              resultado.consumidor, typeDocument,
            ),

            "credito-concedido": convertSPCInput(
              get20CreditoConcedidoInput,
              resultado["credito-concedido"],
            ),
            "dados-adicionais-de-contato": convertSPCInput(
              get5233DadosAdicionaisDeContatoInput,
              resultado["dados-adicionais-de-contato"],
            ),
            "dados-agencia-bancaria": convertSPCInput(
              get28DadosAgenciaBancariaInput,
              resultado["dados-agencia-bancaria"],
            ),
            "endereco-cep-consultado": convertSPCInput(
              get4EnderecoCepConsultadoInput,
              resultado["endereco-cep-consultado"],
            ),

            "informacao-poder-judiciario": convertSPCInput(
              get67InformacaoPoderJudiciarioInput,
              resultado["informacao-poder-judiciario"],
            ),
            "pendencia-financeira": convertSPCInput(
              get55PendenciaFinanceiraInput,
              resultado["pendencia-financeira"],
            ),
            protesto: convertSPCInput(get17ProtestoInput, resultado.protesto),
            spc: convertSPCInput(get8SPCInput, resultado.spc),
            "telefone-consultado": convertSPCInput(
              get3TelefoneConsultadoInput,
              resultado["telefone-consultado"],
            ),
            "telefone-vinculado-assinante-consultado":
              convertSPCInput(
                get44TelefoneVinculadoAssinanteConsultadoInput,
                resultado["telefone-vinculado-assinante-consultado"],
              ),

            ...(insumos.includes(5244) && {
              "divida-publica-cadin": convertSPCInput(
                get5244DividaPublicaCadinInput,
                resultado["divida-publica-cadin"],
              ),
            }),
            ...(insumos.includes(5178) && {
              "faturamento-presumido": convertSPCInput(
                get5178FaturamentoPresumidoInput,
                resultado["faturamento-presumido"],
              ),
            }),
            ...(insumos.includes(5185) && {
              "gasto-estimado-pj": convertSPCInput(
                get5185GastoEstimadoPJInput,
                resultado["gasto-estimado-pj"],
              ),
            }),
            ...(insumos.includes(5241) && {
              "grupo-economico": convertSPCInput(
                get5241GrupoEconomicoInput,
                resultado["grupo-economico"],
              ),
            }),
            ...(insumos.includes(5224) && {
              "indice-comportamento-gastos-cadastro-positivo":
                convertSPCInput(
                  get5224IndiceComportamentoGastosCadastroPositivoInput,
                  resultado["indice-comportamento-gastos-cadastro-positivo"],
                ),
            }),
            ...(insumos.includes(5227) && {
              "indice-pontualidade-pagamento-cadastro-positivo":
                convertSPCInput(
                  get5227IndicePontualidadePagamentoCadastroPositivoInput,
                  resultado["indice-pontualidade-pagamento-cadastro-positivo"],
                ),
            }),

            ...(insumos.includes(5229) && {
              "score-pj": convertSPCInput(get5229ScorePJInput, resultado["score-pj"]),
            }),
            ...(insumos.includes(5245) && {
              "score-recuperacao-pj": convertSPCInput(
                get5245ScoreRecuperacaoPJInput,
                resultado["score-recuperacao-pj"],
              ),
            }),

            ...(insumos.includes(5256) && {
              "insumo-operacao-scr": convertSPCInput(
                get5256InsumoOperacaoSCRInput,
                resultado["insumo-operacao-scr"],
              ),
            }),
            ...(insumos.includes(5257) && {
              "insumo-historico-operacao-scr":
                convertSPCInput(
                  get5257InsumoHistoricoOperacaoSCRInput,
                  resultado["insumo-historico-operacao-scr"],
                ),
            }),

            ...(insumos.includes(18) && {
              acao: convertSPCInput(get18AcaoInput, resultado.acao),
            }),

            ...(insumos.includes(49) && {
              administrador: convertSPCInput(
                get49AdministradorInput,
                resultado.administrador,
              ),
            }),

            ...(insumos.includes(77) && {
              "spc-score-3-meses": convertSPCInput(
                get77SPCScore3MesesInput,
                resultado["spc-score-3-meses"],
              ),
            }),
          };

    return result;
  } catch (error) {
    if (error instanceof FriendlyError) throw error;

    throw new FriendlyError({
      message: "Erro ao consultar SPC Mais.",
      originalError: error,
      context: "spc695UseCase",
      code: 400,
    });
  }
}
