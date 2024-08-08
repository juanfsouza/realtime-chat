import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('newMessage', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="flex items-center mb-4">
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="w-14 h-14 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">Username</h3>
            <p>Some profile details</p>
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col bg-white p-4">
        <div className="flex-1 overflow-y-auto mb-4 border border-gray-300 p-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-l"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
