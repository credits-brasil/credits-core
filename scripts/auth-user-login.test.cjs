// node --require tsx/cjs --require tsconfig-paths/register --test scripts/auth-user-login.test.cjs
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Fastify = require('fastify');
const { prisma } = require('../src/repositories/prisma.ts');
const { hashPassword } = require('../src/utils/hash-password/index.ts');
const { authUserRoutes } = require('../src/routes/auth-user.routes.ts');
const { createUser, updateUser } = require('../src/repositories/user.repository.ts');

function mockMethod(t, target, key, implementation) {
  const original = target[key];
  target[key] = implementation;
  t.after(() => { target[key] = original; });
}

const password = ' Abc!123@ ';
const record = {
  id: 'user-1', name: 'Test', cpf: '00000000000', email: 'test@example.com',
  phone: '11900000000', password: hashPassword(password),
  createdAt: new Date(), updatedAt: new Date(),
};

async function app(t) {
  const server = Fastify();
  server.register(authUserRoutes);
  t.after(() => server.close());
  return server;
}

test('email login normalizes email, preserves password, and returns user companies', async (t) => {
  const server = await app(t);
  mockMethod(t, prisma.user, 'findFirst', async ({ where }) => {
    assert.deepEqual(where, { email: 'test@example.com' });
    return record;
  });
  mockMethod(t, prisma.admin, 'findUnique', async () => { throw Error('Wrong model'); });
  mockMethod(t, prisma.companyUser, 'findMany', async ({ where }) => {
    assert.equal(where.userId, record.id);
    assert.equal(where.status.not, 'INACTIVE');
    return [{ role: 'USER', status: 'ACTIVE', company: { id: 'company-1', name: 'Company', cnpj: '00000000000000' } }];
  });
  const response = await server.inject({ method: 'POST', url: '/api/auth/user/login', payload: { email: ' TEST@EXAMPLE.COM ', password } });
  assert.equal(response.statusCode, 200);
  const { session } = response.json();
  assert.equal(session.user.id, record.id);
  assert.equal(session.user.companies[0].role, 'USER');
  assert.match(session.accessToken, /^user_auth_/);
  assert.ok(!('password' in session.user));
  assert.ok(!('admin' in session));
});

test('first access users are blocked before the session is created', async (t) => {
  const server = await app(t);
  mockMethod(t, prisma.user, 'findFirst', async () => ({ ...record, firstAccess: true }));
  mockMethod(t, prisma.companyUser, 'findMany', async () => { throw Error('Must not create a session'); });

  const response = await server.inject({ method: 'POST', url: '/api/auth/user/login', payload: { email: record.email, password } });

  assert.equal(response.statusCode, 403);
  assert.match(response.json().message, /Primeiro acesso/i);
});

test('wrong passwords, unknown emails and malformed hashes return 401', async (t) => {
  const server = await app(t);
  let stored = record;
  mockMethod(t, prisma.user, 'findFirst', async () => stored);
  mockMethod(t, prisma.companyUser, 'findMany', async () => { throw Error('Must not create a session'); });
  for (const wrongPassword of ['123', password.trim(), ' Other!123 ']) {
    const response = await server.inject({ method: 'POST', url: '/api/auth/user/login', payload: { email: record.email, password: wrongPassword } });
    assert.equal(response.statusCode, 401);
  }
  for (const invalidRecord of [null, { ...record, password: 'salt:zz' }, { ...record, password }]) {
    stored = invalidRecord;
    const response = await server.inject({ method: 'POST', url: '/api/auth/user/login', payload: { email: record.email, password } });
    assert.equal(response.statusCode, 401);
  }
});

test('missing or invalid credentials and CPF-only login return 400 before database access', async (t) => {
  const server = await app(t);
  mockMethod(t, prisma.user, 'findFirst', async () => { throw Error('Unexpected database query'); });
  for (const payload of [{}, { cpf: record.cpf, password }, { email: 123, password }, { email: record.email, password: 123 }, { email: ' ', password }, { email: record.email, password: '' }]) {
    const response = await server.inject({ method: 'POST', url: '/api/auth/user/login', payload });
    assert.equal(response.statusCode, 400);
  }
});

test('create and update hash the complete password including letters, symbols and spaces', async (t) => {
  const verify = async ({ data }) => {
    const salt = data.password.split(':')[0];
    assert.equal(data.password, hashPassword(password, salt));
    assert.notEqual(data.password, hashPassword('123', salt));
    return { ...record, ...data };
  };
  mockMethod(t, prisma.user, 'create', verify);
  mockMethod(t, prisma.user, 'update', verify);
  await createUser({ user: '12345678', name: record.name, cpf: record.cpf, email: record.email, phone: record.phone, password });
  await updateUser(record.id, { password });
});
