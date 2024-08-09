import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazene o token no localStorage
        setSuccess('Login bem-sucedido!');
        setError(null);
        setTimeout(() => router.push('/'), 2000); // Redireciona após 2 segundos
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      setError('Erro de login');
      setSuccess(null);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary px-4 py-2 rounded "
          >
            Login
          </button>
          <button
              type="button"
              onClick={handleRegister}
              className="btn-primary px-4 py-2 rounded mx-5"
            >
              Register
            </button>
        </form>
        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
      </div>
    </div>
  );
};

export default Login;