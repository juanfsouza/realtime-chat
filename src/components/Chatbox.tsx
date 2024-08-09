import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FaPlus } from 'react-icons/fa';

const socket = io('http://localhost:3001');

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [contacts, setContacts] = useState<{ id: number; name: string; profilePicture?: string }[]>([]);
  const [user, setUser] = useState<{ name: string; profilePicture?: string }>({
    name: 'Unknown User',
    profilePicture: '/default-avatar.png'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Carregar dados do localStorage no lado do cliente
    const storedName = localStorage.getItem('userName') || 'Unknown User';
    const storedProfilePicture = localStorage.getItem('userProfilePicture') || '/default-avatar.png';
    
    setUser({
      name: storedName,
      profilePicture: storedProfilePicture
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', { sender: user.name, text: message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('newMessage', (data: { sender: string; text: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Simular uma chamada para buscar contatos (substitua com a sua lógica real)
    const fetchContacts = async () => {
      // Adicione sua lógica para buscar contatos aqui
      setContacts([
        { id: 1, name: 'User2', profilePicture: '/images/profile.jpg' },
        { id: 2, name: 'User3', profilePicture: '/images/profile.jpg' }
      ]);
    };
    
    fetchContacts();

    return () => {
      socket.off('newMessage');
    };
  }, [user.name]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePicture = reader.result as string;
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: newProfilePicture
        }));
        localStorage.setItem('userProfilePicture', newProfilePicture); // Atualizar o Local Storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen">
      {/* Lista de Contatos */}
      <div className="w-1/3 bg-gray-200 p-4 border-r border-gray-300">
        <h2 className="text-lg font-bold mb-4">Contatos</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id} className="flex items-center mb-2 p-2 bg-white rounded shadow-sm">
              <img
                src={contact.profilePicture || '/default-avatar.png'}
                alt={contact.name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span>{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Área de Mensagens */}
      <div className="w-2/3 flex flex-col bg-white p-4">
        <div className="relative flex items-center mb-4 border border-gray-300 p-4 bg-gray-50 rounded">
          <img
            src={user.profilePicture || '/default-avatar.png'}
            alt={user.name}
            className="w-12 h-12 rounded-full mr-4 border-2 border-slate-800 cursor-pointer"
            onClick={handleProfilePictureClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePictureChange}
            className="hidden"
          />
          <FaPlus
            className="absolute top-4 left-4 m-2 text-slate-300 rounded-full p-1 w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-80"
            onClick={handleProfilePictureClick}
          />
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 border border-gray-300 p-4 bg-gray-50 rounded">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              <img
                src={contacts.find(contact => contact.name === msg.sender)?.profilePicture || '/default-avatar.png'}
                alt={msg.sender}
                className="w-8 h-8 rounded-full mr-2 inline-block"
              />
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Caixa de Entrada */}
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-l"
            placeholder="Digite uma mensagem"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
