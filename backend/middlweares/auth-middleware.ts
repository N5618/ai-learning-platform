import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = 'my_super_secret_12345'; 

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error: any = new Error("No valid token provided");
            error.status = 401;
            return next(error);
        }

        const token = authHeader.split(' ')[1];

      
        const decoded: any = jwt.verify(token, JWT_SECRET);

    
        if (decoded && decoded.role === 'admin') {
          
            (req as any).user = decoded; 
            next();
        } else {
            const error: any = new Error("Access denied. Admins only.");
            error.status = 403;
            next(error);
        }
    } catch (err) {
     
        const error: any = new Error("Invalid or expired token");
        error.status = 401;
        next(error);
    }
};