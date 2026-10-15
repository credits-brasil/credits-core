import test from "node:test";
import assert from "node:assert/strict";

import {
  isMongoClientReady,
  normalizePlatformLogEntry,
  paginatePlatformLogs,
} from "./platform-log.repository";
import { normalizeProtocolValue } from "./order.repository";

test("normalizePlatformLogEntry keeps previous and new state plus actor metadata", () => {
  const normalized = normalizePlatformLogEntry({
    action: "USER_UPDATE",
    entity: "USER",
    actorUserId: "user-1",
    actorName: "Maria Santos",
    actorRole: "ADMIN",
    previousState: { name: "Maria", status: "ACTIVE" },
    newState: { name: "Maria Santos", status: "INACTIVE" },
    ip: "127.0.0.1",
    userAgent: "Mozilla/5.0",
    requestPath: "/api/company/abc/users/123",
    companyId: "company-1",
    companyName: "Financeira XP",
    source: "credits-platform-manager",
  });

  assert.equal(normalized.action, "USER_UPDATE");
  assert.equal(normalized.entity, "USER");
  assert.equal(normalized.actor.userId, "user-1");
  assert.equal(normalized.actor.name, "Maria Santos");
  assert.deepEqual(normalized.previousState, { name: "Maria", status: "ACTIVE" });
  assert.deepEqual(normalized.newState, { name: "Maria Santos", status: "INACTIVE" });
  assert.equal(normalized.requestPath, "/api/company/abc/users/123");
  assert.equal(normalized.companyId, "company-1");
  assert.equal(normalized.source, "credits-platform-manager");
});

test("paginatePlatformLogs calculates page metadata from total count", () => {
  const page = paginatePlatformLogs({ total: 125, page: 2, limit: 20 });

  assert.equal(page.total, 125);
  assert.equal(page.page, 2);
  assert.equal(page.limit, 20);
  assert.equal(page.totalPages, 7);
  assert.equal(page.hasNextPage, true);
  assert.equal(page.hasPreviousPage, true);
});

test("isMongoClientReady detects closed topology before reconnect", () => {
  const closedClient = {
    topology: {
      isConnected: () => false,
      isDestroyed: () => true,
    },
  } as any;

  assert.equal(isMongoClientReady(closedClient), false);
});

test("normalizeProtocolValue converts SPC protocol object into plain string", () => {
  const value = normalizeProtocolValue({ numero: "15310470569", digito: "0" });
  assert.equal(value, "153104705690");

  const nested = normalizeProtocolValue({ $: { numero: "15310470569", digito: "0" } });
  assert.equal(nested, "153104705690");
});
