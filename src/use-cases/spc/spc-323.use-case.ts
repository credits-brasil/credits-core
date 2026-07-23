import { AppError } from "@/constants/spc";

import { FriendlyError, getTipoConsumidor } from "@/utils";
import { HTTPSPCService } from "@/services";
import { get19AlertaDocumentoInput } from "@/utils/inputs/get-19-alerta-documento.input";
import { get64AtividadeEmpresaInput } from "@/utils/inputs/get-64-atividade-empresa.input";
import { get48CapitalSocialInput } from "@/utils/inputs/get-48-capital-social.input";
import { get15CCFInput } from "@/utils/inputs/get-15-ccf.input";
import { get68ChequeConsultaOnlineSRSInput } from "@/utils/inputs/get-68-cheque-consulta-online-srs.input";
import { get9ChequeLojistaInput } from "@/utils/inputs/get-9-cheque-lojista.input";
import { get21ConsultaRealizadaInput } from "@/utils/inputs/get-21-consulta-realizada.input";
import { get1ConsumidorInput } from "@/utils/inputs/get-1-consumidor.input";
import { get16ContraOrdemInput } from "@/utils/inputs/get-16-contra-ordem.input";
import { get27ContraOrdemDocumentoDiferenteInput } from "@/utils/inputs/get-27-contra-ordem-documento-diferente.input";
import { get22ContumaciaInput } from "@/utils/inputs/get-22-contumacia.input";
import { get20CreditoConcedidoInput } from "@/utils/inputs/get-20-credito-concedido.input";
import { get5233DadosAdicionaisDeContatoInput } from "@/utils/inputs/get-5233-dados-adicionais-de-contato.input";
import { get28DadosAgenciaBancariaInput } from "@/utils/inputs/get-28-dados-agencia-bancaria.input";
import { get4EnderecoCepConsultadoInput } from "@/utils/inputs/get-4-endereco-cep-consultado.input";
import { get2GrafiaPJInput } from "@/utils/inputs/get-2-grafia-pj.input";
import { get67InformacaoPoderJudiciarioInput } from "@/utils/inputs/get-67-informacao-poder-judiciario.input";
import { get17ProtestoInput } from "@/utils/inputs/get-17-protesto.input";
import { get8SPCInput } from "@/utils/inputs/get-8-spc.input";
import { get3TelefoneConsultadoInput } from "@/utils/inputs/get-3-telefone-consultado.input";
import { get44TelefoneVinculadoAssinanteConsultadoInput } from "@/utils/inputs/get-44-telefone-vinculado-assinante-consultado.input";
import { get12UltimoEnderecoInformadoInput } from "@/utils/inputs/get-12-ultimo-endereco-informado.input";
import { get10UltimoTelefoneInformadoInput } from "@/utils/inputs/get-10-ultimo-telefone-informado.input";
import { get5180AlertaIdentidadeInput } from "@/utils/inputs/get-5180-alerta-identidade.input";
import { get5262AlertaIdentidadeFraudeInput } from "@/utils/inputs/get-5262-alerta-identidade-fraude.input";
import { get5195CollectionScorePlusInput } from "@/utils/inputs/get-5195-collection-score-plus.input";
import { get5194ComprometimentoRendaMensalPfInput } from "@/utils/inputs/get-5194-comprometimento-renda-mensal-pf.input";
import { get5244DividaPublicaCadinInput } from "@/utils/inputs/get-5244-divida-publica-cadin.input";
import { get5178FaturamentoPresumidoInput } from "@/utils/inputs/get-5178-faturamento-presumido.input";
import { get5185GastoEstimadoPJInput } from "@/utils/inputs/get-5185-gasto-estimado-pj.input";
import { get5241GrupoEconomicoInput } from "@/utils/inputs/get-5241-grupo-economico.input";
import { get5224IndiceComportamentoGastosCadastroPositivoInput } from "@/utils/inputs/get-5224-indice-comportamento-gastos-cadastro-positivo.input";
import { get5227IndicePontualidadePagamentoCadastroPositivoInput } from "@/utils/inputs/get-5227-indice-pontualidade-pagamento-cadastro-positivo.input";
import { get5184RiscoCreditoPJInput } from "@/utils/inputs/get-5184-risco-credito-pj.input";
import { get5229ScorePJInput } from "@/utils/inputs/get-5229-score-pj.input";
import { get78SPCScore12MesesInput } from "@/utils/inputs/get-78-spc-score-12-meses.input";
import { get77SPCScore3MesesInput } from "@/utils/inputs/get-77-spc-score-3-meses.input";
import { get5228ScoreCadastroPositivoInput } from "@/utils/inputs/get-5228-score-cadastro-positivo.input";
import { get5190IndiceRelacionamentoMercadoPfInput } from "@/utils/inputs/get-5190-indice-relacionamento-mercado-pf.input";
import { get5268ValidaCelularInput } from "@/utils/inputs/get-5268-valida-celular.input";

export async function spc323UseCase(
  document: string,
  typeDocument: "CPF" | "CNPJ",
  insumos: number[],
) {
  const allowedInsumos = new Set([
    5180, 5262, 5195, 5194, 5244, 5178, 5185, 5241, 5224, 5227, 5190, 5184,
    5228, 5229, 78, 77, 5268,
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
      productCode: 323,
      tipoConsumidor: getTipoConsumidor(typeDocument),
      document,
      insumos,
    });

    return {
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
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["dados-agencia-bancaria"],
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

      // 17
      protesto: get17ProtestoInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"].protesto,
      ),

      // 8
      spc: get8SPCInput(json["S:Envelope"]["S:Body"]["ns2:resultado"].spc),

      // 3
      "telefone-consultado": get3TelefoneConsultadoInput(
        json["S:Envelope"]["S:Body"]["ns2:resultado"]["telefone-consultado"],
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

      // OPICIONAL

      // 5180
      ...(insumos.includes(5180) && {
        "alerta-identidade": get5180AlertaIdentidadeInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["alerta-identidade"],
        ),
      }),

      // 5262
      ...(insumos.includes(5262) && {
        "alerta-identidade-fraude": get5262AlertaIdentidadeFraudeInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "alerta-identidade-fraude"
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

      // 5227
      ...(insumos.includes(5227) && {
        "indice-pontualidade-pagamento-cadastro-positivo":
          get5227IndicePontualidadePagamentoCadastroPositivoInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "indice-pontualidade-pagamento-cadastro-positivo"
            ],
          ),
      }),

      // 5190
      ...(insumos.includes(5190) && {
        "indice-relacionamento-mercado-pf":
          get5190IndiceRelacionamentoMercadoPfInput(
            json["S:Envelope"]["S:Body"]["ns2:resultado"][
              "indice-relacionamento-mercado-pf"
            ],
          ),
      }),

      // 5184
      ...(insumos.includes(5184) && {
        "risco-credito-pj": get5184RiscoCreditoPJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["risco-credito-pj"],
        ),
      }),

      // 5228
      ...(insumos.includes(5228) && {
        "score-cadastro-positivo": get5228ScoreCadastroPositivoInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"][
            "score-cadastro-positivo"
          ],
        ),
      }),

      // 5229
      ...(insumos.includes(5229) && {
        "score-pj": get5229ScorePJInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["score-pj"],
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

      // 5268
      ...(insumos.includes(5268) && {
        "valida-celular": get5268ValidaCelularInput(
          json["S:Envelope"]["S:Body"]["ns2:resultado"]["valida-celular"],
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
