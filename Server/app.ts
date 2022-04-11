import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
//import generateFake from './fake';

import initDatabase from './database/initDatabase';
import router from './routes/main';
import errorMiddleware from './middlewares/error.middleware';
import onConnection from './socket/onConnection';

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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    credentials: true,
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
  },
});

io.on('connection', (socket) => onConnection(io, socket));

httpServer.listen(3000, async () => {
  await initDatabase();
  //await generateFake(100);
});
