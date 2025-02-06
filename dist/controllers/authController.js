"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const response_1 = require("../shared/response");
const authService_1 = require("../services/authService");
const authController = async (req, res, next) => {
    try {
        const { user, password } = req.body;
        if (!user || !password) {
            return (0, response_1.errorResponse)(res, "User/Password are required", 400);
        }
        const token = await (0, authService_1.auth)(user, password);
        if (!token)
            (0, response_1.errorResponse)(res, "User/Password are invalid", 401);
        (0, response_1.successResponse)(res, token, "ok");
    }
    catch (error) {
        next(error);
    }
};
exports.authController = authController;
