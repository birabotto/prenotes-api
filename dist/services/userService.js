"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt = require("bcryptjs");
const create = async (user, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            user,
            password: hashedPassword,
        },
    });
};
exports.create = create;
