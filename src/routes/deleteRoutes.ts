import { Router } from "express";
import { DestroyController } from "../controllers/destroyController";

const router = Router();

router.get("/", DestroyController);

export default router;
