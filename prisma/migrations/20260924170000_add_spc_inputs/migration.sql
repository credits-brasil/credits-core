CREATE TABLE "spc_inputs" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "typeDocument" "TypeDocument" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "spc_inputs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "spc_inputs_code_typeDocument_key" ON "spc_inputs"("code", "typeDocument");
CREATE INDEX "spc_inputs_typeDocument_active_idx" ON "spc_inputs"("typeDocument", "active");

INSERT INTO "spc_inputs" ("id", "code", "label", "typeDocument", "updatedAt") VALUES
('spc-cnpj-78', '78', 'Score 12 meses', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-77', '77', 'Score 3 meses', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5229', '5229', 'Score PJ', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5247', '5247', 'Score PJ MEI', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5179', '5179', 'Limite de Crédito PJ', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5265', '5265', 'Participação no Mercado de Capitais', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5267', '5267', 'Quantidade de funcionários', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-24', '24', 'Participação Empresa', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-49', '49', 'Quadro administrativo', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-23', '23', 'Controle Societário', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5186', '5186', 'Quadro Social Mais Completo PJ', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5185', '5185', 'Gasto Financeiro Estimado PJ', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5178', '5178', 'Faturamento Presumido', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5224', '5224', 'Índice de Comportamento de Gastos', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5227', '5227', 'Índice Pontualidade de Pagamento', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5256', '5256', 'Operações no SCR', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cnpj-5257', '5257', 'Histórico de Operações no SCR', 'CNPJ', CURRENT_TIMESTAMP),
('spc-cpf-78', '78', 'Score 12 meses', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-77', '77', 'Score 3 meses', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5239', '5239', 'Classificação de Risco dos Débitos Ativos', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5228', '5228', 'Score + Positivo', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5122', '5122', 'Renda Presumida + Positivo', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5224', '5224', 'Índice de Comportamento de Gastos', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5227', '5227', 'Índice Pontualidade de Pagamento', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5142', '5142', 'Limite de Crédito Sugerido', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5194', '5194', 'Comprometimento de Renda Mensal', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5256', '5256', 'Operações no SCR', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5257', '5257', 'Histórico de Operações no SCR', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5264', '5264', 'Alerta de CPF suspeito', 'CPF', CURRENT_TIMESTAMP),
('spc-cpf-5262', '5262', 'Alerta de Identidade à Fraude', 'CPF', CURRENT_TIMESTAMP);