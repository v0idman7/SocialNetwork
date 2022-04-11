import { Socket } from 'socket.io';
import MessageService from '../services/message.service';

const onConnection = (io: any, socket: Socket) => {
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
};

export default onConnection;
