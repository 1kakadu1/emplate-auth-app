import { Request, Response, NextFunction, } from 'express';
import { ApiError } from '../exeptions/api-error';

export const errorMiddleware = (err: any, req: Request,res: Response,next: NextFunction) => {
    console.log(err);
    if(err instanceof ApiError){
        return res.status(err.status).json({
            error: err.message
        })
    }

    return res.status(500).json({error: "Ошибка работы сервера"})
}