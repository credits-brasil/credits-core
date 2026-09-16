export enum AppError {
  INTERNAL_SERVER_ERROR = "Erro interno do servidor.",
  INVALID_PAYLOAD = "Campos obrigatórios não informados.",
  COMPANY_NOT_FOUND = "Empresa não encontrada.",
  OPERATOR_NOT_FOUND = "Operador não encontrado.",
  OPERATOR_ALREADY_EXISTS = "Já existe um operador cadastrado com este CPF para esta empresa.",
}

export enum AppMessages {
  CREATE_OPERATOR_SUCCESS = "Operador criado com sucesso.",
  UPDATE_OPERATOR_SUCCESS = "Operador atualizado com sucesso.",
  DELETE_OPERATOR_SUCCESS = "Operador removido com sucesso.",
  LIST_OPERATOR_SUCCESS = "Operadores encontrados com sucesso.",
}
