import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AutofillStyle = () => (
  <style jsx>{`
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
);

const AuthScreen = ({ mode = "login", onBack, onAuthSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authTab, setAuthTab] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Sync authTab with route changes
  useEffect(() => {
    const currentMode = location.pathname === "/signup" ? "signup" : "login";
    setAuthTab(currentMode);
    // Reset form when switching between login/signup
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setAgreedToTerms(false);
    setShowPassword(false);
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLogin = authTab === "login";

  const isFormValid = () => {
    if (isLogin) {
      return formData.email.trim() !== "" && formData.password.trim() !== "";
    } else {
      return (
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        agreedToTerms
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    if (!isLogin && !agreedToTerms) {
      alert(
        "Harap setujui Syarat & Ketentuan serta Kebijakan Privasi terlebih dahulu."
      );
      return;
    }

    if (
      authTab === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      alert("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api${endpoint}` : `/api${endpoint}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data.details && Array.isArray(data.details)
            ? data.details.join("; ")
            : data.message || "Terjadi kesalahan";
        throw new Error(message);
      }

      // Simpan token jika ada
      if (data.token) {
        localStorage.setItem("unily_token", data.token);
      }

      // Simpan user data
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role || "pelanggan",
      };

      if (data.user) {
        localStorage.setItem("unily_user", JSON.stringify(user));
      }

      // Panggil callback success
      if (typeof onAuthSuccess === "function") {
        onAuthSuccess(user);
      } else {
        onBack();
      }
    } catch (err) {
      setError(
        err.message || `Terjadi kesalahan saat ${isLogin ? "login" : "signup"}`
      );
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black relative overflow-hidden">
      <AutofillStyle />

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-students-studying-together-in-a-library-4895-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[oklch(0.4_0.15_140)]/30 via-[oklch(0.35_0.15_140)]/40 to-gray-900/70"></div>

      {/* Auth Card - Centered with Blur */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-10 border border-white/20 transition-all duration-500">
        {/* Logo and Title */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-white/70" />
              </div>
              <input
                name="name"
                type="text"
                placeholder="Nama Lengkap"
                onChange={handleChange}
                value={formData.name}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-white/70" />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email Kampus"
              onChange={handleChange}
              value={formData.email}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-white/70" />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              onChange={handleChange}
              value={formData.password}
              className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
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

          {/* Terms and Conditions Checkbox - Only for Signup */}
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
                className="text-xs text-white/90 leading-relaxed"
              >
                Saya setuju dengan{" "}
                <a
                  href="#"
                  className="text-[oklch(0.7_0.15_140)] underline hover:text-white"
                >
                  Syarat & Ketentuan
                </a>{" "}
                serta{" "}
                <a
                  href="#"
                  className="text-[oklch(0.7_0.15_140)] underline hover:text-white"
                >
                  Kebijakan Privasi
                </a>{" "}
                Unily.
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className={`w-full font-bold py-3 rounded-xl text-sm tracking-wide uppercase transition-all mt-2 shadow-lg ${
              isFormValid() && !loading
                ? "bg-[oklch(0.4_0.15_140)] text-white hover:bg-[oklch(0.35_0.15_140)] transform hover:-translate-y-0.5 cursor-pointer"
                : "bg-white/20 text-white/40 cursor-not-allowed"
            }`}
          >
            {loading ? "Memproses..." : isLogin ? "MASUK" : "DAFTAR"}
          </button>

          {isLogin && (
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-xs text-white/80 hover:text-white transition-colors"
              >
                Lupa Kata Sandi?
              </button>
            </div>
          )}
        </form>

        {/* Switch Auth Mode Text */}
        <div className="text-center mt-6">
          {isLogin ? (
            <p className="text-white/80 text-sm">
              Belum punya akun?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[oklch(0.7_0.15_140)] font-semibold hover:text-white transition-colors underline"
              >
                Daftar
              </button>
            </p>
          ) : (
            <p className="text-white/80 text-sm">
              Punya akun?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[oklch(0.7_0.15_140)] font-semibold hover:text-white transition-colors underline"
              >
                Masuk
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
