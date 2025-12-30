import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   
    console.error("[Error Handler]:", err.message);

    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || 'Internal Server Error';

 
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ID format: ${err.value}`;
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }

  
    if (message === "USER_ALREADY_EXISTS") statusCode = 409;
    if (message === "USER_NOT_FOUND") statusCode = 404;

    
    res.status(statusCode).json({
        success: false,
        message: message
    });
};