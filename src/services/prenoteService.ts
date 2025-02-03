import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import formatNumber from "../shared/formatNumber";
type ParsedArticle = {
  name: string;
  item: string;
  location: string;
  order_qty: number;
  assq: number;
  mpq: number;
  palq: number;
  qty_in_sales: number;
  department: number;
};

export const createPrenotes = async (parsedData: ParsedArticle[]) => {
  if (!parsedData || parsedData.length === 0) {
    throw new Error("Parsed data is empty or invalid.");
  }

  const articlesByDepartment: Record<number, ParsedArticle[]> =
    parsedData.reduce(
      (acc: Record<number, ParsedArticle[]>, item: ParsedArticle) => {
        if (!acc[item.department]) {
          acc[item.department] = [];
        }
        acc[item.department].push(item);
        return acc;
      },
      {}
    );

  const createdPrenotes = [];

  for (const [departmentId, articles] of Object.entries(articlesByDepartment)) {
    const numericDepartmentId = Number(departmentId);

    const departmentExists = await prisma.department.findUnique({
      where: { id: numericDepartmentId },
    });

    if (!departmentExists) {
      throw new Error(`Invalid department ID: ${departmentId}`);
    }

    const prenote = await prisma.prenote.create({
      data: {
        date: new Date(),
        departmentId: numericDepartmentId,
        articles: {
          create: articles.map((item: ParsedArticle) => ({
            name: item.name,
            item: String(formatNumber(item.item)),
            location: item.location || null,
            order_qty: item.order_qty,
            assq: Number(item.assq),
            mpq: item.mpq,
            palq: item.palq,
            qty_in_sales: item.qty_in_sales,
          })),
        },
      },
      include: {
        articles: true,
      },
    });

    createdPrenotes.push(prenote);
  }
};

export const findAllPrenotes = async () => {
  const prenotes = await prisma.prenote.findMany({
    include: {
      _count: {
        select: {
          articles: true,
        },
      },
      department: {
        select: {
          name: true,
        },
      },
      articles: {
        select: {
          done: true,
        },
      },
    },
  });

  return prenotes.map((prenote) => {
    const doneCount = prenote.articles.filter((article) => article.done).length;
    const totalArticles = prenote._count.articles;
    const donePercentage =
      totalArticles > 0 ? (doneCount / totalArticles) * 100 : 0;

    return {
      id: prenote.id,
      createdAt: prenote.date,
      departament: prenote.department.name,
      totalArticles,
      doneCount,
      donePercentage: donePercentage,
    };
  });
};
export const findArticlesByPrenote = async (prenote_id: string) => {
  return await prisma.article.findMany({
    where: {
      prenoteId: Number(prenote_id),
    },
  });
};
