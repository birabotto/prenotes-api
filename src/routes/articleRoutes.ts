import { Router } from "express";
const multer = require("multer");
import {
  findArticlesByPrenoteController,
  findArticlesIdController,
  updaArticleController,
  findArticlesByItemController,
} from "../controllers/articleController";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get("/prenote/:prenote_id", findArticlesByPrenoteController);
router.get("/:id", findArticlesIdController);
router.get("/item/:item", findArticlesByItemController);
router.put("/:id", upload.single("file"), updaArticleController);

export default router;
