import { FastifyInstance } from "fastify";

import {
  authCreateUserController,
  authForgotPasswordController,
  authLoginController,
  authOperatorLoginController,
  authResetPasswordController,
} from "@/controllers/auth";
import {
  AuthForgotPasswordBody,
  AuthLoginBody,
  AuthRegisterBody,
  AuthResetPasswordBody,
} from "@/models/auth.model";

export async function authRoutes(server: FastifyInstance) {
  server.post<{
    Body: AuthRegisterBody;
  }>("/api/auth/register", authCreateUserController);

  server.post<{
    Body: AuthLoginBody;
  }>("/api/auth/login", authLoginController);

  server.post<{    Body: { cpf: string; password: string };
  }> ("/api/auth/operator/login", authOperatorLoginController);

  server.post<{    Body: AuthForgotPasswordBody;
  }>("/api/auth/forgot-password", authForgotPasswordController);

  server.post<{
    Body: AuthResetPasswordBody;
  }>("/api/auth/reset-password", authResetPasswordController);
}