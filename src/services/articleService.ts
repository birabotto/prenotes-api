import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type ParsedArticle = {
  ms: boolean;
  bts: boolean;
  done: boolean;
  top_up: boolean;
  image_url: string;
};

export const findArticlesByPrenote = async (prenote_id: string) => {
  return await prisma.article.findMany({
    where: {
      prenoteId: Number(prenote_id),
    },
    orderBy: {
      location: "asc",
    },
  });
};

export const findArticlesById = async (id: string) => {
  return await prisma.article.findFirst({
    where: {
      id: Number(id),
    },
  });
};

export const updateArticle = async (
  id: string,
  data: ParsedArticle,
  imageUrl: string | null
) => {
  await prisma.article.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      ms: String(data.ms) === "true",
      bts: String(data.bts) === "true",
      done: String(data.done) === "true",
      top_up: String(data.top_up) === "true",
      image_url: imageUrl || data.image_url,
    },
  });
};

export const findArticleByItem = async (item: string) => {
  const article = await prisma.article.findFirst({
    where: {
      item: item,
    },
    select: {
      prenoteId: true,
      name: true,
      location: true,
      ms: true,
      bts: true,
      top_up: true,
      image_url: true,
      notes: true,
      done: true,
    },
  });
  return article;
};
