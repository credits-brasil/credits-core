import { FastifyInstance } from "fastify";

import {
  authUserForgotPasswordController,
  authUserLoginController,
  authUserVerifyResetCodeController,
} from "@/controllers/auth-user";
import {
  AuthForgotPasswordBody,
  AuthLoginBody,
  AuthVerifyResetCodeBody,
} from "@/models/auth.model";

export async function authUserRoutes(server: FastifyInstance) {
  server.post<{
    Body: AuthLoginBody;
  }>("/api/auth/user/login", authUserLoginController);

  server.post<{
    Body: AuthForgotPasswordBody;
  }>("/api/auth/user/forgot-password", authUserForgotPasswordController);

  server.post<{
    Body: AuthVerifyResetCodeBody;
  }>("/api/auth/user/verify-reset-code", authUserVerifyResetCodeController);
}
