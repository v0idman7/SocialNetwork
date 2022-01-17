import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import initDatabase from './database/initDatabase';
import router from './routes/main';
import errorMiddleware from './middlewares/error.middleware';

const app: express.Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
  })
);
app.use('/', router);
app.use(errorMiddleware);
app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.listen(3000, async () => {
  await initDatabase();
});
