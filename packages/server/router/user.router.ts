import { Router } from 'express';
import { UserController } from '../controllers/user';
import { authMiddleware } from '../middlewares/auth.middlewares';

const usersRouter = Router();
const userController = new UserController();

//TODO: эти 4 маршрута должны быть например в authRouter
usersRouter.post('/registration', userController.registration);
usersRouter.post('/login', userController.login);
usersRouter.post('/logout', userController.logout);
usersRouter.post('/refresh', userController.refresh);

usersRouter.get('/users/:id', <any>authMiddleware, userController.user);
usersRouter.get('/users', <any>authMiddleware, userController.users);

export const UsersRouter = usersRouter;
