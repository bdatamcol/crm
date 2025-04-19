'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales incorrectas o usuario no autorizado');
      console.error(error.message);
    } else {
      router.push('/'); // redirige al home
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <label className="block mb-2 font-medium">Correo</label>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Contraseña</label>
        <input
          type="password"
          className="w-full px-4 py-2 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
