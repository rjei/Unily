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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const isLogin = authTab === 'login';
    
    const isFormValid = () => {
        if (isLogin) {
           
            return formData.email.trim() !== '' && formData.password.trim() !== '';
        } else {
            
            return (
                formData.name.trim() !== '' &&
                formData.email.trim() !== '' &&
                formData.password.trim() !== '' &&
                formData.confirmPassword.trim() !== ''
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return; 
        
        if (!formData.email.endsWith('.ac.id')) {
            alert('Pendaftaran hanya dapat dilakukan dengan email kampus (.ac.id).');
            return;
        }

    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const body = mode === 'login' 
        ? { email, password }
        : { name, email, password };

      const response = await fetch(`${API_URL}${endpoint}`, {
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white"> 
            
            <AutofillStyle />

           
            <div className="w-full max-w-sm bg-gray-500 rounded-2xl shadow-xl overflow-hidden p-8 transition-all duration-500">
                
               
                <div className="text-center mb-6"> 
                    <div className="flex items-center justify-center text-white mb-2">
                         <img src="/logo.png" alt="Unily" className="h-6 w-6 object-contain mr-2" /> 
                        <span className="text-lg font-bold tracking-wide">Unily</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">
                        {isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
                    </h2>
                </div>

             
                <div className="flex justify-center bg-gray-600 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setAuthTab('login')}
                        className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition-all ${
                            isLogin 
                            ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-md' 
                            : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuthTab('signup')}
                        className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition-all ${
                            !isLogin 
                            ? 'bg-gray-500 text-white shadow-md' 
                            : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {!isLogin && (
                        <div className="relative group">
                            
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-300" />
                            </div>
                            <input 
                                name="name" 
                                type="text" 
                                placeholder="Nama Lengkap" 
                                onChange={handleChange} 
                                value={formData.name} 
                                className="w-full pl-10 pr-4 py-3 bg-transparent border-2 border-gray-400 rounded-lg text-white text-sm placeholder-gray-300 focus:outline-none focus:border-white transition-colors" 
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-300" />
                        </div>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Email Kampus (.ac.id)" 
                            onChange={handleChange} 
                            value={formData.email} 
                            className="w-full pl-10 pr-4 py-3 bg-transparent border-2 border-gray-400 rounded-lg text-white text-sm placeholder-gray-300 focus:outline-none focus:border-white transition-colors" 
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-300" />
                        </div>
                        <input 
                            name="password" 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Kata Sandi" 
                            onChange={handleChange} 
                            value={formData.password} 
                            className="w-full pl-10 pr-10 py-3 bg-transparent border-2 border-gray-400 rounded-lg text-white text-sm placeholder-gray-300 focus:outline-none focus:border-white transition-colors" 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    
                    {!isLogin && (
                        <div className="relative group">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-300" />
                            </div>
                            <input 
                                name="confirmPassword" 
                                type="password" 
                                placeholder="Konfirmasi Kata Sandi" 
                                onChange={handleChange} 
                                value={formData.confirmPassword} 
                                className="w-full pl-10 pr-4 py-3 bg-transparent border-2 border-gray-400 rounded-lg text-white text-sm placeholder-gray-300 focus:outline-none focus:border-white transition-colors" 
                            />
                        </div>
                    )}
                    
                    
                    <button 
                        type="submit" 
                        disabled={!isFormValid()} 
                        className={`w-full font-bold py-3 rounded-lg text-sm tracking-wide uppercase transition-all mt-2 shadow-lg
                            ${isFormValid() 
                                ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:shadow-pink-500/30 transform hover:-translate-y-0.5 cursor-pointer' 
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed' // Style saat disabled
                            }`}
                    >
                        {isLogin ? 'MASUK' : 'DAFTAR'}
                    </button>
                    
                    {isLogin && (
                         <div className="text-center mt-2">
                            <button type="button" className="text-xs text-gray-300 hover:text-white transition-colors">Lupa Kata Sandi?</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AuthScreen;