"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chartsController_1 = require("../controllers/chartsController");
const router = (0, express_1.Router)();
router.get("/bts", chartsController_1.articleMostBts7daysController);
exports.default = router;
