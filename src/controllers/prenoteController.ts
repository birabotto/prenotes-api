import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../shared/response";
import { parseXls } from "../shared/xlsParser";
import {
  createPrenotes,
  findAllPrenotes,
  findArticlesByPrenote,
} from "../services/prenoteService";

export const createPrenoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (!file) {
      return errorResponse(res, "File is required", 400);
    }

    const parsedData = parseXls(file.buffer);

    await createPrenotes(parsedData);

    successResponse(res, [], "Prenote created successfully");
  } catch (error) {
    next(error);
  }
};

export const findAllPrenoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prenotes = await findAllPrenotes();

    successResponse(res, prenotes, "Find all prenotes");
  } catch (error) {
    next(error);
  }
};
