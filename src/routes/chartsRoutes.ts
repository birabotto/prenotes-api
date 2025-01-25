import { Router } from "express";
import { articleMostBts7daysController } from "../controllers/chartsController";

const router = Router();

router.get("/bts", articleMostBts7daysController);

export default router;
