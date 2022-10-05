import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../exeptions/api-error";
import { TokenServices } from "../services/tokenServices";

export interface IGetUserAuthInfoRequest extends Request {
    userAuth: string | JwtPayload;
  }

export const authMiddleware = (req: IGetUserAuthInfoRequest,res: Response,next: NextFunction)=>{
    try{
        const authorizationHeader = req.headers.authorization;
       
        if(!authorizationHeader){
            return  next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const tokenServices = new TokenServices();
        const userData = tokenServices.validateAccessToken(accessToken);

        if(!userData){
            return next(ApiError.UnauthorizedError());
        }
        req.userAuth = userData;
        next();
    }catch(e: any){
        console.log("catch catch catch catch",e);
        return next(ApiError.UnauthorizedError());
    }
}