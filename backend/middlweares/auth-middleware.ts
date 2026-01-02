import { Request, Response, NextFunction } from "express";
import { UserModel } from "../users/model";



export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['user-id'];

        if (!userId) {
            
            const error: any = new Error("No User ID provided");
            error.status = 401;
            return next(error);
        }

        const user = await UserModel.findById(userId);
        
        if (user && user.role === 'admin') {
            next();
        } else {
           
            const error: any = new Error("Access denied. Admins only.");
            error.status = 403;
            next(error);
        }
    } catch (error) {
       
        next(error);
    }
};