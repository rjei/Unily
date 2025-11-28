import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';


const AutofillStyle = () => (
    <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            /* Warna ini (#6B7280) harus SAMA PERSIS dengan bg-gray-500 di kartu */
            -webkit-box-shadow: 0 0 0px 1000px #6B7280 inset !important; 
            box-shadow: 0 0 0px 1000px #6B7280 inset !important;
            -webkit-text-fill-color: white !important;
            caret-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
    `}</style>
);

const AuthScreen = ({ onBack, onAuthSuccess }) => {
    const [authTab, setAuthTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isLogin = authTab === 'login';

    const isFormValid = () => {
        if (!formData.email || !formData.password) return false;
        if (!isLogin && (!formData.name || !formData.confirmPassword)) return false;
        if (!isLogin && formData.password !== formData.confirmPassword) return false;
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid()) {
            setError('Mohon lengkapi semua field dengan benar.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/signup';
            const body = isLogin 
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password };

            const response = await fetch(`http://localhost:5000/api${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                const message = data.details && Array.isArray(data.details)
                    ? data.details.join('; ')
                    : (data.message || 'Terjadi kesalahan');
                throw new Error(message);
            }

     
            if (data.token) {
                localStorage.setItem('unily_token', data.token);
            }

        
            const user = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role || 'pelanggan',
            };
            
            onAuthSuccess(user);
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat ' + (isLogin ? 'login' : 'signup'));
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
          <h1 className="text-3xl font-bold mt-6">{isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}</h1>
          <p className="text-gray-300 mt-2 text-center">Akses dashboard dan lihat status proposal tim Anda</p>
        </div>
        <div className="flex bg-gray-800 rounded-full p-1 mb-6">
          <button onClick={() => setAuthTab('login')} className={`flex-1 py-2 rounded-full text-sm font-semibold ${isLogin ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'text-gray-300 hover:text-white'}`}>Login</button>
          <button onClick={() => setAuthTab('signup')} className={`flex-1 py-2 rounded-full text-sm font-semibold ${!isLogin ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'text-gray-300 hover:text-white'}`}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Nama</label>
              <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
                <div className="pl-3">
                  <User size={18} className="text-gray-300" />
                </div>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Nama lengkap" className="w-full bg-transparent outline-none p-3" />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
              <div className="pl-3">
                <Mail size={18} className="text-gray-300" />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full bg-transparent outline-none p-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
              <div className="pl-3">
                <Lock size={18} className="text-gray-300" />
              </div>
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Masukkan password" className="w-full bg-transparent outline-none p-3" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 text-gray-400 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Konfirmasi Password</label>
              <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
                <div className="pl-3">
                  <Lock size={18} className="text-gray-300" />
                </div>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Konfirmasi password" className="w-full bg-transparent outline-none p-3" />
              </div>
            </div>
          )}
          <div className="text-right -mt-1">
            <button type="button" className="text-sm text-orange-400 hover:underline">Lupa password?</button>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button 
            type="submit" 
            disabled={loading || !isFormValid()}
            className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : (isLogin ? 'MASUK' : 'DAFTAR')}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AuthScreen;