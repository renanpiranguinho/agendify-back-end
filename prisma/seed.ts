import { PrismaClient, Role } from '@prisma/client';
import { EncryptData } from '../src/utils/encrypt-data';

const prisma = new PrismaClient();

async function main() {
  const encryptDate = new EncryptData();

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? 'admin@email.com',
      name: process.env.ADMIN_NAME ?? 'admin',
      password: await encryptDate.encrypt(process.env.ADMIN_PASSWORD ?? 'Admin!12345', 10),
      is_active: true,
      role: Role.ADMIN,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
