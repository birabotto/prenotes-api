"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv").config();
function isAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    const secret = process.env.JWT_SECRET || "";
    if (!authToken) {
        response.status(401).end();
        return;
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, secret);
        request.userId = sub;
        next();
    }
    catch (error) {
        response.status(401).end();
        return;
    }
}
