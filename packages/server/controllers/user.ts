import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exeptions/api-error';
import { UserServices } from '../services/user.services';

export class UserController{
    async registration(req: Request, res: Response, next: NextFunction){
        try {
            const {email, password} = req.body;
            const userServices = new UserServices(); 
            const userData = await userServices.registration(email, password);
            if(userData.data){
                res.cookie("refreshToken", userData.data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true} );
                return res.status(200).json({
                    data: userData.data
                });
            }

            throw ApiError.BadRequest("Ошибка при регистрации")
            
            
        } catch (error: any) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const {email, password} = req.body;
            const userServices = new UserServices(); 
            const userData = await userServices.login(email, password);
            if(userData.data){
                res.cookie("refreshToken", userData.data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true} );
                return res.status(200).json({
                    data: userData.data
                });
            }

            throw ApiError.BadRequest("Ошибка при входе");
        } catch (error: any) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try {
            const {refreshToken} = req.cookies;
            const userServices = new UserServices(); 
            const userData = await userServices.logout(refreshToken);
            if(userData.data){
                res.clearCookie("refreshToken");
                return res.status(200).json({
                    data: "Выход пролшел успешно"
                });
            }
            throw new Error(userData.error);
        } catch (error: any) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction){
        try {
            const {refreshToken} = req.cookies;
            const userServices = new UserServices(); 
            const userData = await userServices.refresh(refreshToken);
            if(userData.data){
                res.cookie("refreshToken", userData.data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true} );
                return res.status(200).json({
                    data: userData.data
                });
            }

            throw ApiError.BadRequest("Ошибка при входе");
        } catch (error: any) {
            next(error);
        }
    }

    async userProfileInfo(req: Request<{ id: string}>, res: Response, next: NextFunction){
        try {
            console.log("get user =====>", );
            const userId: number = Number(req.params.id);
            const userServices = new UserServices(); 
            const userData = await userServices.getUserById(userId);
            
            if(userData.data){
                return res.status(200).json({
                    data: userData.data
                });
            }

            throw ApiError.BadRequest("Пользователь не существует");
        } catch (error: any) {
            next(error);
        }
    }


}