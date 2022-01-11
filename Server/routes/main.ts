import { Router } from 'express';
import userRouter from './user';
import friendRouter from './friend';
import postRouter from './post';

const router = Router();

router.use('/api/user', userRouter);
router.use('/api/friend', friendRouter);
router.use('/api/post', postRouter);

export default router;
