"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArticlesByPrenote = exports.findAllPrenotes = exports.createPrenotes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const formatNumber_1 = __importDefault(require("../shared/formatNumber"));
const createPrenotes = async (parsedData) => {
    if (!parsedData || parsedData.length === 0) {
        throw new Error("Parsed data is empty or invalid.");
    }
    const articlesByDepartment = parsedData.reduce((acc, item) => {
        if (!acc[item.department]) {
            acc[item.department] = [];
        }
        acc[item.department].push(item);
        return acc;
    }, {});
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
                    create: articles.map((item) => ({
                        name: item.name,
                        item: String((0, formatNumber_1.default)(item.item)),
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
exports.createPrenotes = createPrenotes;
const findAllPrenotes = async () => {
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
        const donePercentage = totalArticles > 0 ? (doneCount / totalArticles) * 100 : 0;
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
exports.findAllPrenotes = findAllPrenotes;
const findArticlesByPrenote = async (prenote_id) => {
    return await prisma.article.findMany({
        where: {
            prenoteId: Number(prenote_id),
        },
    });
};
exports.findArticlesByPrenote = findArticlesByPrenote;
