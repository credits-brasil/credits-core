export enum AppError {
  INTERNAL_SERVER_ERROR = "Erro interno do servidor.",
  INVALID_PAYLOAD = "Campos obrigatórios não informados.",
  ADMIN_NOT_FOUND = "Usuário não encontrado.",
  ADMIN_ALREADY_EXISTS = "Já existe um usuário cadastrado com este CPF ou e-mail.",
}

export enum AppMessages {
  CREATE_ADMIN_SUCCESS = "Usuário criado com sucesso.",
  UPDATE_ADMIN_SUCCESS = "Usuário atualizado com sucesso.",
  DELETE_ADMIN_SUCCESS = "Usuário excluído com sucesso.",
  LIST_ADMIN_SUCCESS = "Usuários encontrados com sucesso.",
}
