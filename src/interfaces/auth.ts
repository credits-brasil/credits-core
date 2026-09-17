export interface CreateAuthAdminInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginAuthInput {
  email: string;
  password: string;
}

export interface LoginUserAuthInput {
  email: string;
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

export interface FirstAccessPasswordAuthInput {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface AuthAdmin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string;
  admin: AuthAdmin;
}

export interface AuthUser {
  id: string;
  name: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAuthSession {
  accessToken: string;
  user: AuthUser;
}

export interface PasswordResetToken {
  token: string;
  expiresAt: string;
}