import assert from "node:assert/strict";

import * as adminRepository from "../src/repositories/admin.repository";
import { authLoginUseCase } from "../src/use-cases/auth-admin/auth-login.use-case";

async function run() {
  const original = adminRepository.findAdminByEmail;
  const fakeAdmin = {
    id: "admin-1",
    name: "Matheus",
    email: "matheus@test.com",
    password: "1234567890",
    status: "ACTIVE",
    mustChangePassword: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  Object.assign(adminRepository, {
    findAdminByEmail: async () => fakeAdmin,
  });

  try {
    await assert.rejects(
      () => authLoginUseCase("matheus@test.com", "1234567890"),
      /Primeiro acesso/i,
    );
    console.log("admin first access test passed");
  } finally {
    Object.assign(adminRepository, {
      findAdminByEmail: original,
    });
  }
}

void run();
