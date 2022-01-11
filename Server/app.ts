import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import initDatabase from './database/initDatabase';

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(3000, async () => {
  await initDatabase();
});
