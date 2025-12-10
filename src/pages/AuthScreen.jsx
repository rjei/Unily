import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";
import AuthFormInputs from "../components/AuthFormInputs";
import ErrorBanner from "../components/common/ErrorBanner";
import { useAuthForm } from "../hooks/useAuthForm";

const AuthScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = location.pathname === "/login";

  useEffect(() => {
    const token = localStorage.getItem("unily_token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

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
  } = useAuthForm(isLogin, () => navigate("/", { replace: true }));

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* 🔥 FIX: Hapus atribut 'jsx'. Pakai style biasa */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.15) inset !important;
          box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.15) inset !important;
          -webkit-text-fill-color: white !important;
          caret-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <AuthBackground isLogin={isLogin} />

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-10 border border-white/20 transition-all duration-500">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center text-white mb-3">
            <img
              src="/logo.png"
              alt="Unily"
              className="h-12 w-12 object-contain mr-2"
            />
            <span className="text-3xl font-bold tracking-wide">Unily</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {isLogin ? "Masuk ke Akun Anda" : "Buat Akun Baru"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <AuthFormInputs
            isLogin={isLogin}
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {!isLogin && (
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 mr-2 w-4 h-4 accent-[oklch(0.4_0.15_140)] cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-white/90 leading-relaxed cursor-pointer"
              >
                Saya setuju dengan{" "}
                <a
                  href="#"
                  className="text-[oklch(0.7_0.15_140)] underline hover:text-white"
                >
                  Syarat & Ketentuan
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
                : "bg-white/20 text-white/40 cursor-not-allowed"
            }`}
          >
            {loading ? "Memproses..." : isLogin ? "MASUK" : "DAFTAR"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            {isLogin ? "Belum punya akun? " : "Punya akun? "}
            <button
              onClick={() => navigate(isLogin ? "/signup" : "/login")}
              className="text-[oklch(0.7_0.15_140)] font-semibold hover:text-white transition-colors underline ml-1"
            >
              {isLogin ? "Daftar" : "Masuk"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
