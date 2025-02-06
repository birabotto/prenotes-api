"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const prenoteController_1 = require("../controllers/prenoteController");
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.get("/", prenoteController_1.findAllPrenoteController);
router.post("/create", upload.single("file"), prenoteController_1.createPrenoteController);
exports.default = router;
