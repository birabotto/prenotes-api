"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
router.get("/auth", authController_1.authController);
exports.default = router;
