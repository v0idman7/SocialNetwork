import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import initDatabase from './database/initDatabase';
import router from './routes/main';
import errorMiddleware from './middlewares/error.middleware';
import { createServer } from 'http';
import { Server } from 'socket.io';
import MessageService from './services/message.service';
//import generateFake from './fake';

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

io.on('connection', (socket) => {
  const messageService = new MessageService();
  console.log('user connected', socket.id);

  socket.on('create', (room) => socket.join(room));

  socket.on('message', async ({ chatId, id, message }) => {
    await messageService.addMessage(chatId, id, message);
    io.to(chatId).emit('message', { chatId, id, message });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

httpServer.listen(3000, async () => {
  await initDatabase();
  //await generateFake(100);
});
