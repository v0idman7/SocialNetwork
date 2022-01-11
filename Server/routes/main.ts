import { Router } from 'express';
import userRouter from './user';
import friendRouter from './friend';
import postRouter from './post';
import commentRouter from './comment';
import likePostRouter from './likePost';

const router = Router();

router.use('/api/user', userRouter);
router.use('/api/friend', friendRouter);
router.use('/api/post', postRouter);
router.use('/api/comment', commentRouter);
router.use('/api/likepost', likePostRouter);

export default router;
