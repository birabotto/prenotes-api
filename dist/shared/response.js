"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message) => {
    res.status(200).json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorResponse = errorResponse;
