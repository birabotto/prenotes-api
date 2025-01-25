import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../shared/response";
import {
  findArticlesByPrenote,
  findArticlesById,
  updateArticle,
  findArticleByItem,
} from "../services/articleService";

export const findArticlesByPrenoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prenote_id = req.params.prenote_id;

    if (!prenote_id) {
      return errorResponse(res, "Prenote ID is required", 400);
    }
    const articles = await findArticlesByPrenote(prenote_id);
    successResponse(res, articles, "Find Articles by prenote");
  } catch (error: any) {
    next(error);
  }
};

export const findArticlesIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      return errorResponse(res, "Article ID is required", 400);
    }

    const article = await findArticlesById(id);
    successResponse(res, article, "Find Article by ID");
  } catch (error: any) {
    next(error);
  }
};

export const updaArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const data = req.body;

    const file = req.file || null;
    if (!id) {
      return errorResponse(res, "Article ID is required", 400);
    }

    await updateArticle(id, data, file);
    successResponse(res, [], "Article was updated");
  } catch (error: any) {
    next(error);
  }
};

export const findArticlesByItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = req.params.item;

    if (!item) {
      return errorResponse(res, "item is required", 400);
    }

    const article = await findArticleByItem(item);
    successResponse(res, article, "Find Article by Item");
  } catch (error: any) {
    next(error);
  }
};
