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
const email = 'admin@admin.com';
const password = '1234567890';

async function main() {
  const salt = randomBytes(16).toString('hex');
  const hash = `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: 'admin',
        password: hash,
        status: 'ACTIVE',
      },
    });

    console.log('Updated existing admin user');
    return;
  }

  await prisma.user.create({
    data: {
      name: 'admin',
      cpf: '00000000000',
      email,
      password: hash,
      status: 'ACTIVE',
    },
  });

  console.log('Created admin user');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
