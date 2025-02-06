"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPrenoteController = exports.createPrenoteController = void 0;
const response_1 = require("../shared/response");
const xlsParser_1 = require("../shared/xlsParser");
const prenoteService_1 = require("../services/prenoteService");
const createPrenoteController = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return (0, response_1.errorResponse)(res, "File is required", 400);
        }
        const parsedData = (0, xlsParser_1.parseXls)(file.buffer);
        await (0, prenoteService_1.createPrenotes)(parsedData);
        (0, response_1.successResponse)(res, [], "Prenote created successfully");
    }
    catch (error) {
        next(error);
    }
};
exports.createPrenoteController = createPrenoteController;
const findAllPrenoteController = async (req, res, next) => {
    try {
        const prenotes = await (0, prenoteService_1.findAllPrenotes)();
        (0, response_1.successResponse)(res, prenotes, "Find all prenotes");
    }
    catch (error) {
        next(error);
    }
};
exports.findAllPrenoteController = findAllPrenoteController;
