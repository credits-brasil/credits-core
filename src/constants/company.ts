export enum AppError {
  INTERNAL_SERVER_ERROR = "Erro interno do servidor.",
  INVALID_PAYLOAD = "Campos obrigatórios não informados.",
  COMPANY_NOT_FOUND = "Empresa não encontrada.",
  COMPANY_ALREADY_EXISTS = "Já existe uma empresa cadastrada com este CNPJ.",
}

export enum AppMessages {
  CREATE_COMPANY_SUCCESS = "Empresa criada com sucesso.",
  UPDATE_COMPANY_SUCCESS = "Empresa atualizada com sucesso.",
  DELETE_COMPANY_SUCCESS = "Empresa excluída com sucesso.",
  LIST_COMPANY_SUCCESS = "Empresas encontradas com sucesso.",
}
