import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const DestroyService = async () => {
  await prisma.article.deleteMany();
  await prisma.prenote.deleteMany();
};
