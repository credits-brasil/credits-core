require('dotenv').config();

const { randomBytes, scryptSync } = require('node:crypto');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../src/generated/prisma/client');

const connectionString = (process.env.DATABASE_URL ?? '').replace(
  /([?&])sslmode=[^&]+&?/,
  '$1',
);

const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });
const email = 'matheusantos.developer@gmail.com';
const password = '1234567890';

function hashPassword(value) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(value, salt, 64).toString('hex')}`;
}

async function main() {
  const passwordHash = hashPassword(password);
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: 'Matheus Santos',
        password: passwordHash,
      },
    });

    console.log('Updated existing user');
    return;
  }

  await prisma.user.create({
    data: {
      user: 'matheusantos.developer@gmail.com',
      cpf: '00000000000',
      name: 'Matheus Santos',
      password: passwordHash,
      email,
      phone: '00000000000',
    },
  });

  console.log('Created user');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
