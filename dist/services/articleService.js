"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArticleByItem = exports.updateArticle = exports.findArticlesById = exports.findArticlesByPrenote = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findArticlesByPrenote = async (prenote_id) => {
    return await prisma.article.findMany({
        where: {
            prenoteId: Number(prenote_id),
        },
        orderBy: [
            {
                location: {
                    sort: "asc",
                    nulls: "last",
                },
            },
        ],
    });
};
exports.findArticlesByPrenote = findArticlesByPrenote;
const findArticlesById = async (id) => {
    return await prisma.article.findFirst({
        where: {
            id: Number(id),
        },
    });
};
exports.findArticlesById = findArticlesById;
const updateArticle = async (id, data, imageUrl) => {
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
exports.updateArticle = updateArticle;
const findArticleByItem = async (item) => {
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
exports.findArticleByItem = findArticleByItem;
