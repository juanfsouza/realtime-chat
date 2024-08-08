import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: any;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('newMessage', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  };

  const sendMessage = async () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto bg-gray-200 p-4 rounded-md">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            {msg}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <button onClick={sendMessage} className="ml-4 p-2 bg-blue-500 text-white rounded-md">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
