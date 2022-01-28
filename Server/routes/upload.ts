import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { User } from '../database/models';
import ApiError from '../exceptions/api.error';
import imageMiddleware from '../middlewares/image.middleware';
const pathImages = path.resolve(__dirname, '../images');
const uploadRouter = Router();

uploadRouter.post(
  '/one',
  imageMiddleware.single('profile'),
  async (req, res) => {
    try {
      if (req.file) {
        const id = req.query.id;
        const userPhoto = await User.findOne({
          attributes: ['photo'],
          where: { id },
        });
        if (userPhoto?.photo)
          fs.unlink(`${pathImages}/${userPhoto.photo}`, (err) => {
            if (err) throw err;
          });
        await User.update({ photo: req.file.filename }, { where: { id } });
        res.json(req.file);
      } else {
        throw ApiError.BadRequest('ошибка загрузки файла');
      }
    } catch (e) {
      console.log(e);
    }
  }
);

uploadRouter.post(
  '/many',
  imageMiddleware.array('images', 8),
  async (req, res) => {
    try {
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        const result = files.map((file) => file.filename);
        res.json(result);
      } else {
        throw ApiError.BadRequest('ошибка загрузки файла');
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export default uploadRouter;
