const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const kitchens =
    await prisma.$executeRaw`INSERT INTO "Department" ("id", "name") VALUES (1, 'Kitchens') ON CONFLICT DO NOTHING;`;
  const living_rooms =
    await prisma.$executeRaw`INSERT INTO "Department" ("id", "name") VALUES (2, 'Living Rooms') ON CONFLICT DO NOTHING;`;
  const bedrooms =
    await prisma.$executeRaw`INSERT INTO "Department" ("id", "name") VALUES (3, 'Bedrooms') ON CONFLICT DO NOTHING;`;

  console.log({ kitchens, living_rooms, bedrooms });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
