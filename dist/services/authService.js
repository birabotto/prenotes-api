"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("dotenv").config();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = async (user, password) => {
    const userCheck = await prisma.user.findUnique({ where: { user } });
    if (!userCheck) {
        return;
    }
    const passwordValid = await bcrypt.compare(password, userCheck.password);
    if (!passwordValid) {
        return;
    }
    const token = jwt.sign({ userId: userCheck.id }, process.env.SECRET, {
        expiresIn: "1h",
    });
    return token;
};
exports.auth = auth;
