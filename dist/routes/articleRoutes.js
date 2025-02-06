"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const articleController_1 = require("../controllers/articleController");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = (0, express_1.Router)();
router.get("/prenote/:prenote_id", articleController_1.findArticlesByPrenoteController);
router.get("/:id", articleController_1.findArticlesIdController);
router.get("/item/:item", articleController_1.findArticlesByItemController);
router.put("/:id", upload.single("file"), articleController_1.updaArticleController);
exports.default = router;
