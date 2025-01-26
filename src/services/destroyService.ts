import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const DestroyService = async () => {
  await prisma.article.deleteMany();
  await prisma.prenote.deleteMany();
};

export const LastDepartamentBedService = async () => {
  return await prisma.prenote.findFirst({
    where: {
      departmentId: 3,
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
    },
  });
};
