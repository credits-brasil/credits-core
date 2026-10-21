const { PrismaClient } = require('@prisma/client');
const crypto = require('node:crypto');

const prisma = new PrismaClient();
const token = '51f4830fc93ee905644b0b00b2f5d2d4a69960e42e90a41bf1f6b7bec7f31343';
const companyId = '9542d1f8-0758-454f-8c52-873204b81f26';
const hash = crypto.createHash('sha256').update(token).digest('hex');

(async () => {
  const session = await prisma.session.findFirst({
    where: {
      accessTokenHash: hash,
      kind: 'USER',
      revokedAt: null,
      accessExpiresAt: { gt: new Date() },
    },
  });

  console.log('SESSION_FOUND=' + Boolean(session));

  if (session) {
    console.log(JSON.stringify({
      id: session.id,
      userId: session.userId,
      kind: session.kind,
      accessExpiresAt: session.accessExpiresAt,
    }, null, 2));

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    console.log('USER_FOUND=' + Boolean(user));

    if (user) {
      console.log(JSON.stringify({
        id: user.id,
        name: user.name,
        companyId: user.companyId,
      }, null, 2));

      const relation = await prisma.companyUser.findFirst({
        where: {
          companyId,
          userId: session.userId,
          status: 'ACTIVE',
        },
      });

      console.log('RELATION_FOUND=' + Boolean(relation));
      if (relation) {
        console.log(JSON.stringify({
          id: relation.id,
          companyId: relation.companyId,
          userId: relation.userId,
          status: relation.status,
        }, null, 2));
      }
    }
  }

  await prisma.$disconnect();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
