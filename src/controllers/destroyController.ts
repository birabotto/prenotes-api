import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../shared/response";

import {
  DestroyService,
  LastDepartamentBedService,
} from "../services/destroyService";

export const DestroyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await DestroyService();
    successResponse(res, [], "Delete all");
  } catch (error: any) {
    next(error);
  }
};

export const LastDepartamentBedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lastPrenote = await LastDepartamentBedService();
    successResponse(res, lastPrenote, "Last prenote all");
  } catch (error: any) {
    next(error);
  }
};
