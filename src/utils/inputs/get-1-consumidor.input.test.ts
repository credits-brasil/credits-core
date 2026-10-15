import test from "node:test";
import assert from "node:assert/strict";

import { get1ConsumidorInput } from "./get-1-consumidor.input";

test("get1ConsumidorInput accepts single-object secondary activity in CNPJ payload", () => {
  const normalized = get1ConsumidorInput(
    {
      "consumidor-pessoa-juridica": {
        $: {
          "data-fundacao": "2023-02-28T00:00:00-03:00",
          email: "financeiro.trimaxacessorios@gmail.com",
          "nome-comercial": "MAX ACESSORIOS PARA ESQUADRIAS LTDA",
          "razao-social": "MAX ACESSORIOS PARA ESQUADRIAS LTDA",
        },
        cnpj: {
          $: { numero: "49740377000176" },
        },
        "situacao-cnpj": {
          $: {
            "descricao-situacao": "ATIVA",
            "data-situacao": "2026-09-18T16:34:11-03:00",
          },
        },
        endereco: {
          $: {
            logradouro: "VITORINO FREIRE",
            numero: "49",
            complemento: "CONJ 1",
            bairro: "VILA GALVAO",
            cep: "7071040",
          },
          cidade: {
            $: { nome: "GUARULHOS" },
            estado: {
              $: { "sigla-uf": "SP" },
            },
          },
        },
        telefone: {
          $: { "numero-ddd": "11", numero: "970681385" },
        },
        "natureza-juridica": {
          $: { descricao: "SOCIEDADE EMPRESARIA LIMITADA", codigo: "2062" },
        },
        "atividade-economica-principal": {
          $: {
            descricao: "COMÉRCIO ATACADISTA DE FERRAGENS E FERRAMENTAS",
            codigo: "4672900",
          },
        },
        "atividade-economica-secundaria": {
          $: {
            descricao:
              "COMÉRCIO ATACADISTA DE OUTROS EQUIPAMENTOS E ARTIGOS DE USO PESSOAL E DOMÉSTICO NÃO ESPECIFICADOS ANTERIORMENTE",
            codigo: "4649499",
          },
        },
      },
    },
    "CNPJ",
  );

  assert.deepEqual(normalized["atividade-economica-secundaria"], [
    {
      description:
        "COMÉRCIO ATACADISTA DE OUTROS EQUIPAMENTOS E ARTIGOS DE USO PESSOAL E DOMÉSTICO NÃO ESPECIFICADOS ANTERIORMENTE",
      code: "4649499",
    },
  ]);
});
