import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', (req, res, next) =>
  userController.login(req, res, next)
);
userRouter.post('/registration', (req, res, next) =>
  userController.registration(req, res, next)
);
userRouter.post('/logout', (req, res, next) =>
  userController.logout(req, res, next)
);
userRouter.post('/refresh', (req, res, next) =>
  userController.refresh(req, res, next)
);

export default userRouter;
