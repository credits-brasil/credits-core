// Run: node --require tsx/cjs --require tsconfig-paths/register --test scripts/spc-695.test.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const axios = require("axios");
const { spc695UseCase } = require("../src/use-cases/spc/spc-695.use-case.ts");

const allowed = {
  CPF: [5262, 5180, 5266, 5195, 5194, 5241, 5224, 5227, 5142, 5232,
    5228, 5268, 5256, 5257, 18, 5253, 5264, 5239, 77, 5122],
  CNPJ: [5244, 5178, 5185, 5241, 5224, 5227, 5229, 5245, 5256, 5257, 18, 49, 77],
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
  for (const [type, ids] of [["CPF", [3082]], ["CPF", [49]], ["CNPJ", [5122]]]) {
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
