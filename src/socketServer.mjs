import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado', socket.id);

  socket.on('sendMessage', (data) => {
    // data deve ser um objeto com { message, sender }
    console.log('Mensagem recebida:', data);
    io.emit('newMessage', data); // Emite a mensagem com o remetente para todos os clientes
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Servidor WebSocket rodando na porta 3001');
});
