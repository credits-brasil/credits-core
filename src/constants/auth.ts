export enum AppError {
  INTERNAL_SERVER_ERROR = "Erro interno do servidor.",
  ADMIN_ALREADY_EXISTS = "Já existe um usuário cadastrado com este e-mail.",
  ADMIN_NOT_FOUND = "Usuário não encontrado.",
  USER_NOT_FOUND = "Usuário não encontrado.",
  INVALID_CREDENTIALS = "E-mail ou senha inválidos.",
  RESET_TOKEN_INVALID = "Token de redefinição inválido ou expirado.",
  RESET_TOKEN_EXPIRED = "O código expirou. Solicite um novo código.",
  INVALID_PAYLOAD = "Campos obrigatórios não informados.",
}

export enum AppMessages {
  ADMIN_CREATED_SUCCESS = "Usuário criado com sucesso.",
  LOGIN_SUCCESS = "Login realizado com sucesso.",
  PASSWORD_RESET_TOKEN_SUCCESS = "Token de redefinição gerado com sucesso.",
  PASSWORD_RESET_SUCCESS = "Senha redefinida com sucesso.",
  FIRST_ACCESS_PASSWORD_SUCCESS = "Senha inicial atualizada com sucesso.",
}