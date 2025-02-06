"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArticlesByItemController = exports.updaArticleController = exports.findArticlesIdController = exports.findArticlesByPrenoteController = void 0;
const response_1 = require("../shared/response");
const articleService_1 = require("../services/articleService");
const cloudinaryService_1 = require("../shared/cloudinaryService");
const findArticlesByPrenoteController = async (req, res, next) => {
    try {
        const prenote_id = req.params.prenote_id;
        if (!prenote_id) {
            return (0, response_1.errorResponse)(res, "Prenote ID is required", 400);
        }
        const articles = await (0, articleService_1.findArticlesByPrenote)(prenote_id);
        (0, response_1.successResponse)(res, articles, "Find Articles by prenote");
    }
    catch (error) {
        next(error);
    }
};
exports.findArticlesByPrenoteController = findArticlesByPrenoteController;
const findArticlesIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return (0, response_1.errorResponse)(res, "Article ID is required", 400);
        }
        const article = await (0, articleService_1.findArticlesById)(id);
        (0, response_1.successResponse)(res, article, "Find Article by ID");
    }
    catch (error) {
        next(error);
    }
};
exports.findArticlesIdController = findArticlesIdController;
const updaArticleController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const file = req.file;
        if (!id) {
            return (0, response_1.errorResponse)(res, "Article ID is required", 400);
        }
        let image_url = null;
        if (file) {
            // Envia o arquivo para o Cloudinary se um arquivo for enviado
            image_url = await (0, cloudinaryService_1.uploadToCloudinary)(file.buffer, file.originalname);
        }
        await (0, articleService_1.updateArticle)(id, data, image_url);
        (0, response_1.successResponse)(res, [], "Article was updated");
    }
    catch (error) {
        next(error);
    }
};
exports.updaArticleController = updaArticleController;
const findArticlesByItemController = async (req, res, next) => {
    try {
        const item = req.params.item;
        if (!item) {
            return (0, response_1.errorResponse)(res, "item is required", 400);
        }
        const article = await (0, articleService_1.findArticleByItem)(item);
        (0, response_1.successResponse)(res, article, "Find Article by Item");
    }
    catch (error) {
        next(error);
    }
};
exports.findArticlesByItemController = findArticlesByItemController;
