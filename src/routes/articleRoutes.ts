import { Router } from "express";
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
import {
  findArticlesByPrenoteController,
  findArticlesIdController,
  updaArticleController,
  findArticlesByItemController,
} from "../controllers/articleController";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.get("/prenote/:prenote_id", findArticlesByPrenoteController);
router.get("/:id", findArticlesIdController);
router.get("/item/:item", findArticlesByItemController);
router.put("/:id", upload.single("file"), updaArticleController);

export default router;
