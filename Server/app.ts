import express from 'express';
import cookieParser from 'cookie-parser';
// import path from 'path';
import cors from 'cors';
import initDatabase from './database/initDatabase';
import router from './routes/main';
import errorMiddleware from './middlewares/error.middleware';

// const __dirname = path.resolve();
const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/', router);
app.use(errorMiddleware);
// app.use(express.static(path.resolve(__dirname, 'static')));

app.listen(3000, async () => {
  await initDatabase();
});
