export interface AuthRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthForgotPasswordBody {
  email: string;
}

export interface AuthVerifyResetCodeBody {
  email: string;
  code: string;
}

export interface AuthResetPasswordBody {
  email: string;
  token: string;
  newPassword: string;
}