export interface CreateAuthUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginAuthInput {
  email: string;
  password: string;
}

export interface LoginOperatorAuthInput {
  cpf: string;
  password: string;
}

export interface ForgotPasswordAuthInput {
  email: string;
}

export interface ResetPasswordAuthInput {
  email: string;
  token: string;
  newPassword: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}

export interface OperatorAuthUser {
  id: string;
  name: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperatorAuthSession {
  accessToken: string;
  operator: OperatorAuthUser;
}

export interface PasswordResetToken {
  token: string;
  expiresAt: string;
}