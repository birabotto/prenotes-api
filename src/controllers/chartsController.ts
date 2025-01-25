import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../shared/response";
import { articleMostBts7days } from "../services/chartsService";

export const articleMostBts7daysController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const charts = await articleMostBts7days();
    successResponse(res, charts, "Find charts articles by last 7 days");
  } catch (error: any) {
    next(error);
  }
};
