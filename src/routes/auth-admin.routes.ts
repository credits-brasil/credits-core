import { authAdminVerifyResetCodeController } from "@/controllers/auth-admin/auth-verify-reset-code.controller";
import { FastifyInstance } from "fastify";

import {
  authCreateAdminController,
  authFirstAccessPasswordController,
  authForgotPasswordController,
  authLoginController,
  authResetPasswordController,
} from "@/controllers/auth-admin";

import {
  AuthFirstAccessPasswordBody,
  AuthForgotPasswordBody,
  AuthLoginBody,
  AuthRegisterBody,
  AuthResetPasswordBody,
  AuthVerifyResetCodeBody,
} from "@/models/auth.model";

export async function authAdminRoutes(server: FastifyInstance) {
  server.post<{ Body: AuthVerifyResetCodeBody }>(
    "/api/auth/admin/verify-reset-code", authAdminVerifyResetCodeController,
  );

  server.post<{
    Body: AuthRegisterBody;
  }>("/api/auth/register", authCreateAdminController);

  server.post<{
    Body: AuthLoginBody;
  }>("/api/auth/admin/login", authLoginController);

  server.post<{
    Body: AuthForgotPasswordBody;
  }>("/api/auth/admin/forgot-password", authForgotPasswordController);

  server.post<{ Body: AuthResetPasswordBody }>(
    "/api/auth/admin/reset-password",
    authResetPasswordController,
  );

  server.post<{ Body: AuthFirstAccessPasswordBody }>(
    "/api/auth/admin/first-access/change-password",
    authFirstAccessPasswordController,
  );
}
