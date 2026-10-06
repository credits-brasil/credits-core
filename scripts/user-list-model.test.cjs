const test = require('node:test');
const assert = require('node:assert/strict');

const { listUsersWithCompanies } = require('../src/repositories/user.repository.ts');

test('listUsersWithCompanies returns users with their linked companies', async () => {
  const users = await listUsersWithCompanies();

  assert.ok(Array.isArray(users));
  if (users.length > 0) {
    const firstUser = users[0];
    assert.ok(firstUser.id);
    assert.ok(Array.isArray(firstUser.companies));
  }
});
