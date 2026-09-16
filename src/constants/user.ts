export enum AppError {
  INTERNAL_SERVER_ERROR = "Erro interno do servidor.",
  INVALID_PAYLOAD = "Campos obrigatórios não informados.",
  USER_NOT_FOUND = "Usuário não encontrado.",
  USER_ALREADY_EXISTS = "Já existe um usuário cadastrado com este CPF ou e-mail.",
}

export enum AppMessages {
  CREATE_USER_SUCCESS = "Usuário criado com sucesso.",
  UPDATE_USER_SUCCESS = "Usuário atualizado com sucesso.",
  DELETE_USER_SUCCESS = "Usuário excluído com sucesso.",
  LIST_USER_SUCCESS = "Usuários encontrados com sucesso.",
}
