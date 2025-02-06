"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destroyController_1 = require("../controllers/destroyController");
const router = (0, express_1.Router)();
router.get("/", destroyController_1.DestroyController);
router.get("/last", destroyController_1.LastDepartamentBedController);
exports.default = router;
