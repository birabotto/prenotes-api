import { Router } from "express";
import {
  DestroyController,
  LastDepartamentBedController,
} from "../controllers/destroyController";

const router = Router();

router.get("/", DestroyController);
router.get("/last", LastDepartamentBedController);

export default router;
