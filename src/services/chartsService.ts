import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const articleMostBts7days = async () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const articles = await prisma.article.findMany({
    where: {
      bts: true,
      prenote: {
        date: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
    },
    select: {
      id: true,
      name: true,
      bts: true,
    },
  });

  return articles;
};
