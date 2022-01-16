import { Router } from 'express';
import { User } from '../database/models';
import ApiError from '../exceptions/api.error';
import imageMiddleware from '../middlewares/image.middleware';

const uploadRouter = Router();

uploadRouter.post('/', imageMiddleware.single('profile'), async (req, res) => {
  try {
    if (req.file) {
      const id = req.query.id;
      await User.update({ photo: req.file.filename }, { where: { id } });
      res.json(req.file);
    } else {
      throw ApiError.BadRequest('ошибка загрузки файла');
    }
  } catch (e) {
    console.log(e);
  }
});

export default uploadRouter;
