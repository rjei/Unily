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
      {/* Nama (hanya saat register) */}
      {!isLogin && (
        <div className="relative group mb-4">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none"
          />
          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Nama Lengkap"
            onChange={handleChange}
            value={formData.name}
            required
            autoComplete="name"
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md 
            border-2 border-white/30 rounded-xl text-white text-sm 
            placeholder-white/60 focus:outline-none focus:border-white 
            focus:bg-white/15 transition-all"
          />
        </div>
      )}

      {/* Email */}
      <div className="group mb-1">
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 
            text-white/70 pointer-events-none"
          />

          <input
            id="auth-email"
            name="email"
            type="email"
            placeholder="Email Kampus (@univ.ac.id)"
            onChange={handleChange}
            value={formData.email}
            required
            autoComplete="email"
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md 
            border-2 border-white/30 rounded-xl text-white text-sm 
            placeholder-white/60 focus:outline-none focus:border-white 
            focus:bg-white/15 transition-all"
          />
        </div>

        <p id="email-hint" className="text-xs text-white/60 mt-1 ml-1">
          Contoh: nama@usu.ac.id
        </p>
      </div>

      {/* Password */}
      <div className="relative group mb-4">
        <Lock
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 
          text-white/70 pointer-events-none"
        />

        <input
          id="auth-password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi (min. 6 karakter)"
          onChange={handleChange}
          value={formData.password}
          required
          minLength={6}
          autoComplete={isLogin ? "current-password" : "new-password"}
          className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md 
          border-2 border-white/30 rounded-xl text-white text-sm 
          placeholder-white/60 focus:outline-none focus:border-white 
          focus:bg-white/15 transition-all"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 
          text-white/70 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      {!isLogin && (
        <div className="relative group mb-4">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 
            text-white/70 pointer-events-none"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md 
            border-2 border-white/30 rounded-xl text-white text-sm 
            placeholder-white/60 focus:outline-none focus:border-white 
            focus:bg-white/15 transition-all"
          />
        </div>
      )}
    </>
  );
};

export default AuthFormInputs;
