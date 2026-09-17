// Run: node --require tsx/cjs --require tsconfig-paths/register --test scripts/spc-695.test.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const axios = require("axios");
const { spc695UseCase } = require("../src/use-cases/spc/spc-695.use-case.ts");

const newCnpjInputs = {
  78: "spc-score-12-meses",
  5247: "score-pj-mei",
  5179: "limite-credito-pj",
  5265: "insumo-participacao-mercado-capitais",
  5267: "quantidade-funcionario",
  24: "participacao-empresa",
  23: "socio",
  5186: "quadro-social-mais-completo-pj",
};
const newCnpjIds = Object.keys(newCnpjInputs).map(Number);

const allowed = {
  CPF: [5262, 5180, 5266, 5195, 5194, 5241, 5224, 5227, 5142, 5232,
    5228, 5268, 5256, 5257, 18, 5253, 5264, 5239, 77, 5122],
  CNPJ: [5244, 5178, 5185, 5241, 5224, 5227, 5229, 5245, 5256, 5257, 18, 49, 77,
    ...newCnpjIds],
};

function soap(content) {
  return `<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Body><ns2:resultado xmlns:ns2="urn:spc">${content}</ns2:resultado></S:Body>
  </S:Envelope>`;
}

for (const type of ["CPF", "CNPJ"]) {
  test(`${type}: missing default and requested blocks do not fail`, async (t) => {
    const consumerTag = type === "CPF" ? "consumidor-pessoa-fisica" : "consumidor-pessoa-juridica";
    const http = t.mock.method(axios, "post", async () => ({
      data: soap(`<consumidor><${consumerTag} nome="Teste" razao-social="Teste" /></consumidor>`),
    }));
    const result = await spc695UseCase("00000000000", type, allowed[type]);
    assert.ok(result.consumidor);
    for (const [key, value] of Object.entries(result)) {
      if (key !== "consumidor") assert.equal(value, null, key);
    }
    if (type === "CNPJ") {
      for (const key of Object.values(newCnpjInputs)) assert.equal(result[key], null, key);
    }
    assert.equal(http.mock.callCount(), 1);
    assert.ok(!("json2" in result));
  });
}

test("present data uses real converters; unrequested inputs stay omitted", async (t) => {
  t.mock.method(axios, "post", async () => ({ data: soap(`
    <cheque-lojista><resumo quantidade-total="0" /></cheque-lojista>
    <credito-concedido><resumo quantidade-total="2" /></credito-concedido>
    <valida-celular><resumo quantidade-total="1" /></valida-celular>
    <spc-score-3-meses><detalhe-spc-score-3-meses score="750" /></spc-score-3-meses>
  `) }));
  const result = await spc695UseCase("00000000000", "CPF", [5268, 77]);
  assert.equal(result["cheque-lojista"], "0");
  assert.equal(result["credito-concedido"], "2");
  assert.equal(result["valida-celular"], "1");
  assert.equal(result["spc-score-3-meses"]["detalhe-spc-score-3-meses"].score, "750");
  const defaults = await spc695UseCase("00000000000", "CPF", []);
  assert.ok(!("valida-celular" in defaults));
  assert.ok(!("spc-score-3-meses" in defaults));
});

test("new CNPJ inputs use real converters and remain omitted unless requested", async (t) => {
  t.mock.method(axios, "post", async () => ({ data: soap(`
    <spc-score-12-meses>
      <detalhe-spc-score-12-meses score="750" horizonte="12" />
      <detalhe-spc-score-12-meses score="800" horizonte="12" />
    </spc-score-12-meses>
    <score-pj-mei>
      <resumo quantidade-total="1" />
      <detalhe-score-pj-mei score="720" tipo-cliente-score="MEI" />
    </score-pj-mei>
    <limite-credito-pj>
      <resumo quantidade-total="1" valor-total="5000" />
      <detalhe-limite-credito-pj valor-limite-credito="5000" data-calculo="2026-09-16" />
    </limite-credito-pj>
    <insumo-participacao-mercado-capitais>
      <resumo quantidade-total="1" />
      <detalhe-insumo-participacao-mercado-capitais>
        <numero-documento>00000000000000</numero-documento>
        <participante-mercado-capital>S</participante-mercado-capital>
        <tipo-pessoa>J</tipo-pessoa>
      </detalhe-insumo-participacao-mercado-capitais>
    </insumo-participacao-mercado-capitais>
    <quantidade-funcionario>
      <resumo quantidade-total="1" />
      <detalhe-quantidade-funcionario><qtdeFuncionario>12</qtdeFuncionario></detalhe-quantidade-funcionario>
    </quantidade-funcionario>
    <participacao-empresa>
      <resumo quantidade-total="1" />
      <detalhe-participacao-empresa documento="00000000000001" nome="Empresa Teste" porcentual-participacao="50" />
    </participacao-empresa>
    <socio>
      <resumo quantidade-total="1" />
      <detalhe-socio nome="Socio Teste" porcentual-participacao="50" cargo-administracao="Diretor" />
    </socio>
    <quadro-social-mais-completo-pj>
      <resumo quantidade-total="2" />
      <detalhe-quadro-social-mais-completo-pj>
        <controle-societario><detalhes-socio-1 nome="Socio A" percentual="50" /></controle-societario>
        <controle-societario><detalhes-socio-1 nome="Socio B" percentual="50" /></controle-societario>
        <quadro-administrativo><administrativo nome="Administrador A" cargo="Diretor" /></quadro-administrativo>
        <quadro-administrativo><administrativo nome="Administrador B" cargo="Diretor" /></quadro-administrativo>
      </detalhe-quadro-social-mais-completo-pj>
    </quadro-social-mais-completo-pj>
  `) }));
  const result = await spc695UseCase("00000000000000", "CNPJ", newCnpjIds);
  assert.deepEqual(result["spc-score-12-meses"]["detalhe-spc-score-12-meses"].map((item) => item.score), ["750", "800"]);
  assert.equal(result["score-pj-mei"]["detalhe-score-pj-mei"].score, "720");
  assert.equal(result["score-pj-mei"]["detalhe-score-pj-mei"]["tipo-cliente-score"], "MEI");
  assert.equal(result["limite-credito-pj"]["detalhe-limite-credito-pj"]["valor-limite-credito"], "5000");
  assert.deepEqual(result["insumo-participacao-mercado-capitais"]["detalhe-insumo-participacao-mercado-capitais"], {
    "numero-documento": "00000000000000",
    "participante-mercado-capital": "S",
    "tipo-pessoa": "J",
  });
  assert.equal(result["quantidade-funcionario"]["detalhe-quantidade-funcionario"].qtdeFuncionario, "12");
  const participation = result["participacao-empresa"]["detalhe-participacao-empresa"];
  assert.equal(participation.length, 1);
  assert.equal(participation[0].documento, "00000000000001");
  assert.equal(participation[0]["porcentual-participacao"], "50");
  const partners = result.socio["detalhe-socio"];
  assert.equal(partners.length, 1);
  assert.equal(partners[0].nome, "Socio Teste");
  assert.equal(partners[0]["cargo-administracao"], "Diretor");
  const social = result["quadro-social-mais-completo-pj"]["detalhe-quadro-social-mais-completo-pj"];
  assert.deepEqual(social["controle-societario"].map((item) => item["detalhes-socio-1"].$.nome), ["Socio A", "Socio B"]);
  assert.deepEqual(social["quadro-administrativo"].map((item) => item.administrativo.$.nome), ["Administrador A", "Administrador B"]);
  const defaults = await spc695UseCase("00000000000000", "CNPJ", []);
  for (const key of Object.values(newCnpjInputs)) assert.ok(!(key in defaults), key);
});

test("CNPJ participation preserves multiple companies", async (t) => {
  t.mock.method(axios, "post", async () => ({ data: soap(`
    <participacao-empresa>
      <resumo quantidade-total="2" />
      <detalhe-participacao-empresa nome="Empresa A" />
      <detalhe-participacao-empresa nome="Empresa B" />
    </participacao-empresa>
  `) }));
  const result = await spc695UseCase("00000000000000", "CNPJ", [24]);
  assert.equal(result["participacao-empresa"].resumo["quantidade-total"], "2");
  assert.deepEqual(result["participacao-empresa"]["detalhe-participacao-empresa"].map((item) => item.nome), ["Empresa A", "Empresa B"]);
});

test("empty SOAP tags for new CNPJ inputs return null", async (t) => {
  t.mock.method(axios, "post", async () => ({
    data: soap(Object.values(newCnpjInputs).map((key) => `<${key} />`).join("")),
  }));
  const result = await spc695UseCase("00000000000000", "CNPJ", newCnpjIds);
  for (const key of Object.values(newCnpjInputs)) assert.equal(result[key], null, key);
});

test("empty SOAP tags return null", async (t) => {
  t.mock.method(axios, "post", async () => ({
    data: soap("<cheque-lojista /><credito-concedido /><valida-celular />"),
  }));
  const result = await spc695UseCase("00000000000", "CPF", [5268]);
  assert.equal(result["cheque-lojista"], null);
  assert.equal(result["credito-concedido"], null);
  assert.equal(result["valida-celular"], null);
});

test("missing result remains an upstream error", async (t) => {
  t.mock.method(console, "log", () => {});
  t.mock.method(axios, "post", async () => ({
    data: '<S:Envelope xmlns:S="urn:soap"><S:Body /></S:Envelope>',
  }));
  await assert.rejects(spc695UseCase("00000000000", "CPF", []), (error) => {
    assert.equal(error.code, 502);
    assert.equal(error.context, "spc695UseCase.response");
    return true;
  });
});

test("malformed present blocks are not silently discarded", async (t) => {
  t.mock.method(console, "log", () => {});
  t.mock.method(axios, "post", async () => ({
    data: soap('<valida-celular><invalido /></valida-celular>'),
  }));
  await assert.rejects(spc695UseCase("00000000000", "CPF", [5268]), (error) => {
    assert.equal(error.message, "Erro ao consultar SPC Mais.");
    assert.ok(error.originalError instanceof TypeError);
    return true;
  });
});

test("invalid inputs are rejected before HTTP", async (t) => {
  t.mock.method(console, "log", () => {});
  const http = t.mock.method(axios, "post", async () => { throw Error("Unexpected HTTP"); });
  for (const [type, ids] of [["CPF", [3082]], ["CPF", [49]], ["CNPJ", [5122]],
    ...newCnpjIds.map((id) => ["CPF", [id]])]) {
    await assert.rejects(spc695UseCase("00000000000", type, ids), (error) =>
      error.code === 400 && error.context === "spc695UseCase.validation");
  }
  assert.equal(http.mock.callCount(), 0);
});

test("service errors remain errors", async (t) => {
  t.mock.method(console, "log", () => {});
  const failure = Error("Connection failed");
  t.mock.method(axios, "post", async () => { throw failure; });
  await assert.rejects(spc695UseCase("00000000000", "CPF", []), (error) =>
    error.context === "spcRequest" && error.originalError === failure);
});
