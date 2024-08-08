import { Server } from 'socket.io';

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log('Criando novo servidor Socket.io...');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Novo cliente conectado', socket.id);

      socket.on('sendMessage', (msg) => {
        io.emit('newMessage', msg);
      });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
      });
    });
  }
  res.end();
};

export default ioHandler;
