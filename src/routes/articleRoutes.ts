import { Router } from "express";
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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

interface CloudinaryParams {
  folder: string;
  format:
    | string
    | ((req: Request, file: Express.Multer.File) => string | Promise<string>);
  public_id:
    | string
    | ((req: Request, file: Express.Multer.File) => string | Promise<string>);
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "prenotes",
    format: "png",
    public_id: (req: Request, file: Express.Multer.File) => {
      const timestamp = Date.now();
      const originalName = file.originalname.split(".").slice(0, -1).join(".");
      return `${originalName}-${timestamp}`;
    },
  } as CloudinaryParams,
});

const upload = multer({ storage });
const router = Router();

router.get("/prenote/:prenote_id", findArticlesByPrenoteController);
router.get("/:id", findArticlesIdController);
router.get("/item/:item", findArticlesByItemController);
router.put("/:id", upload.single("file"), updaArticleController);

export default router;
