import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = (process.env.DATABASE_URL ?? "").replace(
  /([?&])sslmode=[^&]+&?/,
  "$1",
);

const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

const cnpjSpcInputs = [
  ["78", "Score 12 meses", "CNPJ"],
  ["77", "Score 3 meses", "CNPJ"],
  ["5229", "Score PJ", "CNPJ"],
  ["5247", "Score PJ MEI", "CNPJ"],
  ["5179", "Limite de Crédito PJ", "CNPJ"],
  ["5265", "Participação no Mercado de Capitais", "CNPJ"],
  ["5267", "Quantidade de funcionários", "CNPJ"],
  ["24", "Participação Empresa", "CNPJ"],
  ["49", "Quadro administrativo", "CNPJ"],
  ["23", "Controle Societário", "CNPJ"],
  ["5186", "Quadro Social Mais Completo PJ", "CNPJ"],
  ["5185", "Gasto Financeiro Estimado PJ", "CNPJ"],
  ["5178", "Faturamento Presumido", "CNPJ"],
  ["5224", "Índice de Comportamento de Gastos", "CNPJ"],
  ["5227", "Índice Pontualidade de Pagamento", "CNPJ"],
  ["5256", "Operações no SCR", "CNPJ"],
  ["5257", "Histórico de Operações no SCR", "CNPJ"],
] as const;

const cpfSpcInputs = [
  ["78", "Score 12 meses", "CPF"],
  ["77", "Score 3 meses", "CPF"],
  ["5239", "Classificação de Risco dos Débitos Ativos", "CPF"],
  ["5228", "Score + Positivo", "CPF"],
  ["5122", "Renda Presumida + Positivo", "CPF"],
  ["5224", "Índice de Comportamento de Gastos", "CPF"],
  ["5227", "Índice Pontualidade de Pagamento", "CPF"],
  ["5142", "Limite de Crédito Sugerido", "CPF"],
  ["5194", "Comprometimento de Renda Mensal", "CPF"],
  ["5256", "Operações no SCR", "CPF"],
  ["5257", "Histórico de Operações no SCR", "CPF"],
  ["5264", "Alerta de CPF suspeito", "CPF"],
  ["5262", "Alerta de Identidade à Fraude", "CPF"],
] as const;

const spcInputs = [...cnpjSpcInputs, ...cpfSpcInputs] as const;

async function main() {
  for (const [code, label, typeDocument] of spcInputs) {
    await prisma.spcInput.upsert({
      where: { code_typeDocument: { code, typeDocument } },
      update: { label, active: true },
      create: { code, label, typeDocument, active: true },
    });
  }

  console.log(`Seed concluída: ${spcInputs.length} insumos SPC.`);
}

main()
  .catch((error) => {
    console.error("Falha ao executar seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
