import { Router } from "express";
import { UserController } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth.middlewares";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/refresh", userController.refresh);
userRouter.get("/user/:id", <any>authMiddleware ,userController.userProfileInfo);

export const UserRouter = userRouter;