import { Router } from 'express';
import imageMiddleware from '../middlewares/image.middleware';

const uploadRouter = Router();

uploadRouter.post('/', imageMiddleware.single('avatar'), (req, res, next) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (e) {
    console.log(e);
  }
});

export default uploadRouter;
