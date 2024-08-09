import { Server } from 'socket.io';

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log('Criando novo servidor Socket.io...');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const onlineUsers: Set<string> = new Set();

    io.on('connection', (socket) => {
      console.log('Novo cliente conectado', socket.id);

      onlineUsers.add(socket.id);

      io.emit('updateContacts', Array.from(onlineUsers));

      socket.on('sendMessage', (msg) => {
        io.emit('newMessage', msg);
      });

      socket.on('disconnect', () => {
        onlineUsers.delete(socket.id);
        io.emit('updateContacts', Array.from(onlineUsers));
        console.log('Cliente desconectado', socket.id);
      });
    });
  }
  res.end();
};

export default ioHandler;
