import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import ErrorBanner from "../common/ErrorBanner";
import { useAuthForm } from "../../hooks/useAuthForm";

const LoginPopup = ({ onClose, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [authTab, setAuthTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = authTab === "login";

  const handleAuthSuccess = () => {
    if (typeof onAuthSuccess === "function") {
      const user = JSON.parse(localStorage.getItem("unily_user") || "{}");
      onAuthSuccess(user);
    }
    onClose();
    window.location.reload(); // Refresh untuk update state
  };

  const {
    formData,
    loading,
    error,
    agreedToTerms,
    setAgreedToTerms,
    handleChange,
    handleSubmit,
    setError,
    isFormValid,
  } = useAuthForm(isLogin, handleAuthSuccess);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-8 border border-gray-200 transition-all duration-500 animate-fadeIn">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center text-gray-900 mb-2">
            <img
              src="/logo.png"
              alt="Unily"
              className="h-12 w-12 object-contain mr-2"
            />
            <span className="text-3xl font-bold tracking-wide">Unily</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Masuk ke Akun Anda" : "Daftar Sekarang!"}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {isLogin
              ? "Dapatkan akses ke ribuan produk & jasa kampus"
              : "Bergabung dengan komunitas marketplace kampus terbesar"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              onClick={() => setAuthTab(isLogin ? "signup" : "login")}
              className="text-[oklch(0.4_0.15_140)] font-semibold hover:underline"
            >
              {isLogin ? "Daftar" : "Masuk"}
            </button>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                name="name"
                type="text"
                placeholder="Nama Lengkap"
                onChange={handleChange}
                value={formData.name}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[oklch(0.4_0.15_140)] focus:bg-white transition-all"
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email Kampus (.ac.id)"
              onChange={handleChange}
              value={formData.email}
              title="Email harus dari domain akademik (.ac.id)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[oklch(0.4_0.15_140)] focus:bg-white transition-all"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              onChange={handleChange}
              value={formData.password}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[oklch(0.4_0.15_140)] focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Konfirmasi Kata Sandi"
                onChange={handleChange}
                value={formData.confirmPassword}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[oklch(0.4_0.15_140)] focus:bg-white transition-all"
              />
            </div>
          )}

          {!isLogin && (
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 mr-2 w-4 h-4 accent-[oklch(0.4_0.15_140)]"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-600 leading-relaxed"
              >
                Saya setuju dengan{" "}
                <a
                  href="#"
                  className="text-[oklch(0.4_0.15_140)] underline hover:text-[oklch(0.35_0.15_140)]"
                >
                  Syarat & Ketentuan
                </a>{" "}
                serta{" "}
                <a
                  href="#"
                  className="text-[oklch(0.4_0.15_140)] underline hover:text-[oklch(0.35_0.15_140)]"
                >
                  Kebijakan Privasi
                </a>{" "}
                Unily.
              </label>
            </div>
          )}

          {error && (
            <ErrorBanner error={error} onDismiss={() => setError(null)} />
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full font-bold py-3 rounded-xl text-sm tracking-wide uppercase transition-all mt-2 shadow-lg ${
              isFormValid && !loading
                ? "bg-[oklch(0.4_0.15_140)] text-white hover:bg-[oklch(0.35_0.15_140)] transform hover:-translate-y-0.5 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Memproses..." : isLogin ? "MASUK" : "DAFTAR"}
          </button>

          {isLogin && (
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                Lupa Kata Sandi?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
