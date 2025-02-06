"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleMostBts7days = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const articleMostBts7days = async () => {
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
exports.articleMostBts7days = articleMostBts7days;
