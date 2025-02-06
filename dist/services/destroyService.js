"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastDepartamentBedService = exports.DestroyService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const DestroyService = async () => {
    await prisma.article.deleteMany();
    await prisma.prenote.deleteMany();
};
exports.DestroyService = DestroyService;
const LastDepartamentBedService = async () => {
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
exports.LastDepartamentBedService = LastDepartamentBedService;
