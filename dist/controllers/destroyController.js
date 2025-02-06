"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastDepartamentBedController = exports.DestroyController = void 0;
const response_1 = require("../shared/response");
const destroyService_1 = require("../services/destroyService");
const DestroyController = async (req, res, next) => {
    try {
        await (0, destroyService_1.DestroyService)();
        (0, response_1.successResponse)(res, [], "Delete all");
    }
    catch (error) {
        next(error);
    }
};
exports.DestroyController = DestroyController;
const LastDepartamentBedController = async (req, res, next) => {
    try {
        const lastPrenote = await (0, destroyService_1.LastDepartamentBedService)();
        (0, response_1.successResponse)(res, lastPrenote, "Last prenote all");
    }
    catch (error) {
        next(error);
    }
};
exports.LastDepartamentBedController = LastDepartamentBedController;
