import { Router } from "express";
const router = Router();

import { authController } from "../controllers/authController";

router.get("/auth", authController);

export default router;
