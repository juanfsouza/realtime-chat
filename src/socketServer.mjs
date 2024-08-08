import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Permite conexões do frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado', socket.id);

  socket.on('sendMessage', (msg) => {
    console.log('Mensagem recebida:', msg);
    io.emit('newMessage', msg); // Emite a mensagem para todos os clientes
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Servidor WebSocket rodando na porta 3001');
});
