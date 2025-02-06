import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../shared/response";
import { auth } from "../services/authService";

export const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return errorResponse(res, "User/Password are required", 400);
    }

    const token = await auth(user, password);

    if (!token) errorResponse(res, "User/Password are invalid", 401);

    successResponse(res, token, "ok");
  } catch (error: any) {
    next(error);
  }
};
