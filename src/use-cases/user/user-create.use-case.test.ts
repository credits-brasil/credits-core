import assert from "node:assert/strict";
import test from "node:test";

import { AppError } from "@/constants/user";
import { getDuplicateUserErrorMessage } from "./user-create.use-case";

test("getDuplicateUserErrorMessage returns a specific email duplicate message", () => {
  const message = getDuplicateUserErrorMessage({
    email: "joao@teste.com",
    phone: "11999999999",
    user: { email: "joao@teste.com", phone: "11888888888" },
  });

  assert.equal(message, AppError.USER_EMAIL_ALREADY_EXISTS);
});

test("getDuplicateUserErrorMessage returns a specific phone duplicate message", () => {
  const message = getDuplicateUserErrorMessage({
    email: "outro@teste.com",
    phone: "11999999999",
    user: { email: "outro2@teste.com", phone: "11999999999" },
  });

  assert.equal(message, AppError.USER_PHONE_ALREADY_EXISTS);
});

test("getDuplicateUserErrorMessage returns a combined duplicate message when both match", () => {
  const message = getDuplicateUserErrorMessage({
    email: "joao@teste.com",
    phone: "11999999999",
    user: { email: "joao@teste.com", phone: "11999999999" },
  });

  assert.equal(message, AppError.USER_EMAIL_AND_PHONE_ALREADY_EXISTS);
});
