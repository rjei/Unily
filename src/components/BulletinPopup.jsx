import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// --- Komponen Styling Khusus untuk Autofill ---
const AutofillStyle = () => (
    // CSS ini mengatasi masalah autofill browser yang memutihkan background
    <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            /* Memaksa warna latar belakang menjadi gelap (sesuai form) */
            -webkit-box-shadow: 0 0 0px 1000px #0F4C5C inset !important; 
            box-shadow: 0 0 0px 1000px #0F4C5C inset !important;
            -webkit-text-fill-color: white !important; /* Memastikan teks tetap putih */
            color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
        /* Memastikan input tetap transparan saat aktif */
        input:focus {
             background-color: transparent !important;
        }
    `}</style>
);


const AuthScreen = ({ onBack, onAuthSuccess }) => { // Menggunakan nama AuthScreen
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validasi FrontEnd: Wajib .ac.id
        if (!formData.email.endsWith('.ac.id')) {
            alert('Pendaftaran hanya dapat dilakukan dengan email kampus yang berakhiran .ac.id (misal: @universitas.ac.id).');
            return;
        }

        if (authTab === 'signup' && formData.password !== formData.confirmPassword) {
            alert('Kata sandi dan konfirmasi tidak cocok.');
            return;
        }

        // --- Simulasi API Call ---
        console.log(`Mengirim data ${authTab} ke BackEnd...`, formData);
        
        const mockUser = { id: Date.now(), name: formData.name || 'Pengguna', email: formData.email };
        alert(`Sukses ${authTab}! Data akan di-hash dan disimpan di PostgreSQL.`);
        
        // onAuthSuccess(mockUser); // Uncomment ini setelah integrasi
        onBack(); // Kembali ke halaman utama setelah simulasi sukses
    };

    const isLogin = authTab === 'login';

    return (
        // Latar Belakang Halaman: Menggunakan warna Teal/Hijau Gelap solid
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            
            <AutofillStyle /> {/* Wajib dimasukkan untuk mengatasi masalah putih saat autofill */}

            {/* Formulir Glassmorphism Gelap */}
            <div className="w-full max-w-md bg-black/50 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 transition-all duration-500">
                
                {/* Header Card */}
                <div className="text-center mb-6 mt-4"> 
                    <div className="flex items-center justify-center text-white mb-2">
                        {/* Placeholder Logo Unily */}
                        <img src="/logo.png" alt="Unily" className="h-8 w-8 object-contain mr-2" /> 
                        <span className="text-xl font-bold">Unily</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-1">
                        {isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
                    </h2>
                </div>

                {/* Tabs Login/Signup */}
                <div className="flex justify-center bg-black/30 rounded-xl p-1 mb-8">
                    <button
                        onClick={() => setAuthTab('login')}
                        className={`flex-1 text-center py-2 rounded-lg text-sm font-semibold transition-all ${
                            isLogin ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg' : 'text-white/80 hover:bg-white/10'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuthTab('signup')}
                        className={`flex-1 text-center py-2 rounded-lg text-sm font-semibold transition-all ${
                            !isLogin ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg' : 'text-white/80 hover:bg-white/10'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {!isLogin && (
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                            <input name="name" type="text" placeholder="Nama Lengkap" onChange={handleChange} value={formData.name} required className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                    )}

                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                        <input name="email" type="email" placeholder="Email Kampus (.ac.id)" onChange={handleChange} value={formData.email} required className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-teal-500 focus:border-teal-500" />
                    </div>

                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Kata Sandi" onChange={handleChange} value={formData.password} required className="w-full pl-10 pr-10 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-teal-500 focus:border-teal-500" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    
                    {!isLogin && (
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                            <input name="confirmPassword" type="password" placeholder="Konfirmasi Kata Sandi" onChange={handleChange} value={formData.confirmPassword} required className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                    )}
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-orange-700 hover:to-pink-700 transition-colors mt-4 shadow-xl shadow-pink-600/30">
                        {isLogin ? 'MASUK' : 'DAFTAR'}
                    </button>
                    
                    {isLogin && (
                         <div className="text-center mt-3">
                            <button type="button" className="text-sm text-white/80 hover:underline">Lupa Kata Sandi?</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AuthScreen;