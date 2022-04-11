import { Router } from 'express';

import ProfileController from '../controllers/profile.controller';
import authentication from '../middlewares/auth.middleware';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/', authentication, (req, res, next) =>
  profileController.getProfileData(req, res, next)
);
profileRouter.post('/', authentication, (req, res, next) =>
  profileController.updateProfileData(req, res, next)
);

export default profileRouter;
