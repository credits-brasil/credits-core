// Run explicitly against the configured database:
// node --require tsx/cjs --require tsconfig-paths/register --test scripts/auth-admin-reset.integration.test.cjs
require('dotenv').config({ quiet: true });
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { randomUUID } = require('node:crypto');
const Fastify = require('fastify');
const sgMail = require('@sendgrid/mail');
const { prisma } = require('../src/repositories/prisma.ts');
const { hashPassword } = require('../src/utils/hash-password/index.ts');
const { authAdminRoutes } = require('../src/routes/auth-admin.routes.ts');

test('admin recovery persists codes and updates the login password', async (t) => {
  const server = Fastify();
  server.register(authAdminRoutes);
  const originalSend = sgMail.send;
  const originalKey = process.env.SENDGRID_API_KEY;
  const originalFrom = process.env.SENDGRID_FROM_EMAIL;
  process.env.SENDGRID_API_KEY = 'SG.integration-test.integration-test';
  process.env.SENDGRID_FROM_EMAIL = 'test@example.com';
  let sent;
  sgMail.send = async (message) => { sent = message; return [{ statusCode: 202 }]; };
  const email = 'admin-reset-' + randomUUID() + '@example.com';
  const admin = await prisma.admin.create({
    data: { name: 'Recovery test', email, cpf: randomUUID(), password: hashPassword('Original!123') },
  });
  t.after(async () => {
    sgMail.send = originalSend;
    for (const [key, value] of Object.entries({ SENDGRID_API_KEY: originalKey, SENDGRID_FROM_EMAIL: originalFrom })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    try { await prisma.admin.delete({ where: { id: admin.id } }); }
    finally { await server.close(); await prisma.$disconnect(); }
  });
  async function request(path, payload, expected) {
    const response = await server.inject({ method: 'POST', url: '/api/auth/admin/' + path, payload });
    assert.equal(response.statusCode, expected, response.body);
    return response.json();
  }
  async function forgot() {
    const response = await request('forgot-password', { email: ' ' + email.toUpperCase() + ' ' }, 200);
    const code = sent.dynamicTemplateData.verificationCode;
    assert.match(code, /^\d{6}$/);
    assert.equal(sent.to, email);
    assert.ok(!JSON.stringify(response).includes(code));
    const row = await prisma.adminPasswordReset.findUnique({ where: { adminId: admin.id } });
    assert.notEqual(row.codeHash, code);
    return code;
  }
  async function verify(code) {
    return (await request('verify-reset-code', { email, code }, 200)).resetToken;
  }
  await t.test('complete flow, invalid credentials, one-time tokens and actual login', async () => {
    const code = await forgot();
    const wrong = code === '000000' ? '111111' : '000000';
    await request('verify-reset-code', { email, code: wrong }, 400);
    const token = await verify(code);
    await request('verify-reset-code', { email, code }, 400);
    const row = await prisma.adminPasswordReset.findUnique({ where: { adminId: admin.id } });
    assert.notEqual(row.tokenHash, token);
    await request('reset-password', { email, token: 'wrong', newPassword: 'New!Password123' }, 400);
    await request('reset-password', { email, token, newPassword: 'short' }, 400);
    const newPassword = ' New!Password123 ';
    const result = await request('reset-password', { email, token, newPassword }, 200);
    assert.ok(!('password' in result.admin));
    await request('login', { email, password: newPassword }, 200);
    await request('login', { email, password: 'Original!123' }, 401);
    await request('reset-password', { email, token, newPassword: 'Replay!123' }, 400);
    assert.equal(await prisma.adminPasswordReset.count({ where: { adminId: admin.id } }), 0);
  });
  await t.test('resending invalidates previously verified tokens', async () => {
    const token = await verify(await forgot());
    await forgot();
    await request('reset-password', { email, token, newPassword: 'Replay!123' }, 400);
  });
  await t.test('codes and reset tokens expire', async () => {
    const code = await forgot();
    await prisma.adminPasswordReset.update({
      where: { adminId: admin.id }, data: { codeExpiresAt: new Date(0) },
    });
    await request('verify-reset-code', { email, code }, 410);
    const token = await verify(await forgot());
    await prisma.adminPasswordReset.update({
      where: { adminId: admin.id }, data: { tokenExpiresAt: new Date(0) },
    });
    await request('reset-password', { email, token, newPassword: 'Expired!123' }, 400);
  });
  await t.test('five failed attempts invalidate the code', async () => {
    const code = await forgot();
    const wrong = code === '000000' ? '111111' : '000000';
    for (let i = 0; i < 5; i++) await request('verify-reset-code', { email, code: wrong }, 400);
    await request('verify-reset-code', { email, code }, 400);
    await verify(await forgot());
  });
  await t.test('concurrent resets consume the token once', async () => {
    const token = await verify(await forgot());
    const responses = await Promise.all([1, 2].map(() => server.inject({
      method: 'POST', url: '/api/auth/admin/reset-password',
      payload: { email, token, newPassword: 'Concurrent!123' },
    })));
    assert.deepEqual(responses.map(r => r.statusCode).sort(), [200, 400]);
  });
  await t.test('inactive accounts and malformed payloads are rejected', async () => {
    const token = await verify(await forgot());
    await prisma.admin.update({ where: { id: admin.id }, data: { status: 'INACTIVE' } });
    await request('forgot-password', { email }, 404);
    await request('reset-password', { email, token, newPassword: 'Inactive!123' }, 400);
    await prisma.admin.update({ where: { id: admin.id }, data: { status: 'ACTIVE' } });
    for (const path of ['forgot-password', 'verify-reset-code', 'reset-password']) {
      for (const payload of [{}, { email: 123 }, { email, code: 123, token: 123, newPassword: 123 }]) {
        if (path === 'forgot-password' && payload.email === email) continue;
        await request(path, payload, 400);
      }
    }
    await request('forgot-password', { email: 'missing-' + randomUUID() + '@example.com' }, 404);
  });
  await t.test('email delivery failure does not replace an existing recovery', async () => {
    await forgot();
    const before = await prisma.adminPasswordReset.findUnique({ where: { adminId: admin.id } });
    sgMail.send = async () => { throw new Error('Simulated delivery failure'); };
    await request('forgot-password', { email }, 500);
    const after = await prisma.adminPasswordReset.findUnique({ where: { adminId: admin.id } });
    assert.deepEqual(after, before);
  });
});
