import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AuthScreen = ({ onBack, onAuthSuccess, currentUser }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Mohon lengkapi semua field.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const body = mode === 'login' ? { email, password } : { name, email, password };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan');
      }

      // Simpan token jika ada
      if (data.token) {
        localStorage.setItem('unily_token', data.token);
      }

      // Simpan user data
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
      
      onAuthSuccess(user);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat ' + (mode === 'login' ? 'login' : 'signup'));
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-220px)] px-4 py-10">
      <div className="w-full max-w-xl mx-auto mb-4">
        <button onClick={onBack} className="inline-flex items-center text-gray-600 hover:text-[oklch(0.4_0.15_140)] text-sm font-medium">
          <span className="mr-2">←</span> Kembali ke Halaman Utama
        </button>
      </div>
      <div className="w-full max-w-xl mx-auto bg-gray-900 text-white rounded-3xl p-8 shadow-2xl border border-gray-800">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center text-3xl font-extrabold">
            <img src="/logo.png" alt="Unily" className="h-10 w-10 mr-3 object-contain" />
            Unily
          </div>
          <h1 className="text-3xl font-bold mt-6">{mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}</h1>
          <p className="text-gray-300 mt-2 text-center">Akses dashboard dan lihat status proposal tim Anda</p>
        </div>
        <div className="flex bg-gray-800 rounded-full p-1 mb-6">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-full text-sm font-semibold ${mode === 'login' ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'text-gray-300 hover:text-white'}`}>Login</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-full text-sm font-semibold ${mode === 'signup' ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'text-gray-300 hover:text-white'}`}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm mb-1">Nama</label>
              <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" className="w-full bg-transparent outline-none p-3" />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full bg-transparent outline-none p-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" className="w-full bg-transparent outline-none p-3" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 text-gray-400 hover:text-white">{showPassword ? 'Sembunyi' : 'Lihat'}</button>
            </div>
          </div>
          <div className="text-right -mt-1">
            <button type="button" className="text-sm text-orange-400 hover:underline">Lupa password?</button>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : (mode === 'login' ? 'MASUK' : 'DAFTAR')}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AuthScreen;


