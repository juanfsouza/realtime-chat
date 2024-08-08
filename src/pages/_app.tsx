import { useEffect } from 'react';
import io from 'socket.io-client';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

let socket: any;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor WebSocket');
    });

    socket.on('newMessage', (msg: string) => {
      console.log('Nova mensagem recebida:', msg);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
