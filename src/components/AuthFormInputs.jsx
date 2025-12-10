import React from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const AuthFormInputs = ({
  isLogin,
  formData,
  handleChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <>
      {!isLogin && (
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-white/70" />
          </div>
          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Nama Lengkap"
            onChange={handleChange}
            value={formData.name}
            required={!isLogin}
            aria-label="Nama lengkap"
            aria-required={!isLogin}
            autoComplete="name"
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
          />
        </div>
      )}

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail size={18} className="text-white/70" />
        </div>
        <input
          id="auth-email"
          name="email"
          type="email"
          placeholder="Email Kampus (@univ.ac.id)"
          onChange={handleChange}
          value={formData.email}
          required
          aria-label="Email kampus"
          aria-required="true"
          aria-describedby="email-hint"
          autoComplete="email"
          title="Gunakan email dari domain akademik (.ac.id)"
          className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
        />
        <p id="email-hint" className="text-xs text-white/60 mt-1 ml-1">
          Contoh: nama@usu.ac.id
        </p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock size={18} className="text-white/70" />
        </div>
        <input
          id="auth-password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi (min. 6 karakter)"
          onChange={handleChange}
          value={formData.password}
          required
          minLength={6}
          aria-label="Kata sandi"
          aria-required="true"
          aria-describedby="password-hint"
          autoComplete={isLogin ? "current-password" : "new-password"}
          className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={
            showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
          }
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {!isLogin && (
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-white/70" />
          </div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
          />
        </div>
      )}
    </>
  );
};

export default AuthFormInputs;
