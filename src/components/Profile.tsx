import { useState } from 'react';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState(''); // Nome do usuário

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      // Faça a requisição para o backend para salvar a imagem
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.url); // Supondo que o backend retorne a URL da imagem
      } else {
        alert('Erro ao fazer upload da imagem');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-32 h-32 mb-4">
        <img
          src={profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <h2 className="text-lg font-bold">{name}</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-4"
      />
    </div>
  );
};

export default Profile;
