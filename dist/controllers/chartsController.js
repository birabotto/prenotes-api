"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleMostBts7daysController = void 0;
const response_1 = require("../shared/response");
const chartsService_1 = require("../services/chartsService");
const articleMostBts7daysController = async (req, res, next) => {
    try {
        const charts = await (0, chartsService_1.articleMostBts7days)();
        (0, response_1.successResponse)(res, charts, "Find charts articles by last 7 days");
    }
    catch (error) {
        next(error);
    }
};
exports.articleMostBts7daysController = articleMostBts7daysController;
