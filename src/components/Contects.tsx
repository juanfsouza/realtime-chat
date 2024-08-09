import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

interface Contact {
  id: number;
  name: string;
  profilePicture: string | null;
}

const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    socket.on('updateContacts', (onlineUserIds: string[]) => {
      setOnlineUsers(new Set(onlineUserIds));
    });

    const fetchContacts = async () => {
      const response = await fetch('/api/users');
      const data: Contact[] = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Contatos</h2>
      <ul>
        {contacts
          .filter(contact => onlineUsers.has(contact.id.toString()))
          .map((contact) => (
            <li key={contact.id} className="flex items-center mb-2">
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
  );
};

export default ContactsList;
