import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.method === 'POST' ? req.body.userId : req.params.userId;

    if (!userId) {
        const error: any = new Error("User ID is required");
        error.statusCode = 400;
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error: any = new Error("Invalid User ID format");
        error.statusCode = 400;
        return next(error);
    }
    next();
};

export const validatePrompt = (req: Request, res: Response, next: NextFunction) => {
    const { userQuestion, categoryId, subCategoryId } = req.body;

    if (!userQuestion || !categoryId || !subCategoryId) {
        const error: any = new Error("Missing required fields: userQuestion, categoryId, or subCategoryId");
        error.statusCode = 400;
        return next(error);
    }

    if (userQuestion.trim().length < 5) {
        const error: any = new Error("User question is too short (minimum 5 characters)");
        error.statusCode = 400;
        return next(error);
    }

    next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        const error: any = new Error("Name and phone are required");
        error.statusCode = 400;
        return next(error);
    }

    if (phone.length < 9) {
        const error: any = new Error("Invalid phone number format");
        error.statusCode = 400;
        return next(error);
    }

    next();
};