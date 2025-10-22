import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const { login, isLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Invalid credentials');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (user) {
    navigate('/profile');
    return null;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-golden">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border px-3 py-2 mb-3 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border px-3 py-2 mb-3 w-full"
            required
          />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button type="submit" className="bg-golden text-white px-4 py-2 rounded w-full">Login</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
