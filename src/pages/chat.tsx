import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: any;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [activeContact, setActiveContact] = useState<{ id: number; name: string } | null>(null);
  const [username, setUsername] = useState<string>(''); // Nome do usuário
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // Foto de perfil do usuário

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('newMessage', (msg: { text: string; sender: string }) => {
      if (activeContact) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    useEffect(() => {
      // Suposição: Você carrega as informações do usuário ao iniciar o componente
      const fetchUserData = async () => {
        const response = await fetch('/api/user'); // Endpoint para obter detalhes do usuário logado
        const data = await response.json();
        setUsername(data.username);
        setProfilePicture(data.profilePicture);
      };
    
      fetchUserData();
      socketInitializer();
    }, []);

    socket.on('updateContacts', (onlineUserIds: string[]) => {
      // Atualize a lista de contatos online se necessário
    });
  };

  const sendMessage = () => {
    if (message.trim() && activeContact) {
      socket.emit('sendMessage', { text: message, sender: username });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
          {/* Mostrando o nome e a foto do usuário no topo */}
    <div className="flex items-center mb-4">
      <img
        src={profilePicture || '/default-avatar.png'}
        alt={username}
        className="w-10 h-10 rounded-full mr-2"
      />
    <span>{username}</span>
    </div>
      <div className="flex-1 overflow-y-auto bg-gray-200 p-4 rounded-md">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
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
