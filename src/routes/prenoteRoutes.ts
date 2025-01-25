import { Router } from "express";
import multer from "multer";
import {
  createPrenoteController,
  findAllPrenoteController,
} from "../controllers/prenoteController";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", findAllPrenoteController);
router.post("/create", upload.single("file"), createPrenoteController);

export default router;
