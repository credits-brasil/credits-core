export enum AppError {
  INTERNAL_SERVER_ERROR = "Erro interno do servidor.",
  USER_ALREADY_EXISTS = "Já existe um usuário cadastrado com este e-mail.",
  USER_NOT_FOUND = "Usuário não encontrado.",
  INVALID_CREDENTIALS = "E-mail ou senha inválidos.",
  RESET_TOKEN_INVALID = "Token de redefinição inválido ou expirado.",
  INVALID_PAYLOAD = "Campos obrigatórios não informados.",
}

export enum AppMessages {
  USER_CREATED_SUCCESS = "Usuário criado com sucesso.",
  LOGIN_SUCCESS = "Login realizado com sucesso.",
  PASSWORD_RESET_TOKEN_SUCCESS = "Token de redefinição gerado com sucesso.",
  PASSWORD_RESET_SUCCESS = "Senha redefinida com sucesso.",
}