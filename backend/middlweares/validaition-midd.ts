import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";


export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
   let userId;

    if (req.method === 'POST') {
       
        userId = req.body.userId;
    } else {
        
        userId = req.params.userId;
    }

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required"
        });
    }


    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID format"
        });
    }
    next()
}
export const validatePrompt = (req: Request, res: Response, next: NextFunction) => {
    const { userQuestion, categoryId, subCategoryId } = req.body;

    if (!userQuestion || !categoryId || !subCategoryId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: userQuestion, categoryId, or subCategoryId"
        });
    }

    if (userQuestion.trim().length < 5) {
        return res.status(400).json({
            success: false,
            message: "User question is too short (minimum 5 characters)"
        });
    }

    next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: "Name and phone are required"
        });
    }

    if (phone.length < 9) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number format"
        });
    }

    next();
};