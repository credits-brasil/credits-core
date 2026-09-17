import { FastifyInstance } from "fastify";

import {
  authCreateAdminController,
  authForgotPasswordController,
  authLoginController,
  authResetPasswordController,
} from "@/controllers/auth-admin";
import {
  AuthForgotPasswordBody,
  AuthLoginBody,
  AuthRegisterBody,
  AuthResetPasswordBody,
} from "@/models/auth.model";

export async function authAdminRoutes(server: FastifyInstance) {
  server.post<{
    Body: AuthRegisterBody;
  }>("/api/auth/register", authCreateAdminController);

  server.post<{
    Body: AuthLoginBody;
  }>("/api/auth/login", authLoginController);

  server.post<{
    Body: AuthForgotPasswordBody;
  }>("/api/auth/forgot-password", authForgotPasswordController);

  server.post<{
    Body: AuthResetPasswordBody;
  }>("/api/auth/reset-password", authResetPasswordController);
}
