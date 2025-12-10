import { useState } from "react";
import { authService } from "../services/authService";

export const useAuthForm = (isLogin, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Changed to object for inline banner
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on change
  };

  const validate = () => {
    // Email validation untuk semua domain .ac.id
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.ac\.id$/;

    if (!emailPattern.test(formData.email)) {
      setError({
        type: "validation",
        message: "Email harus menggunakan domain akademik (.ac.id)",
      });
      return false;
    }

    if (!isLogin && !agreedToTerms) {
      setError({
        type: "validation",
        message: "Harap setujui Syarat & Ketentuan terlebih dahulu",
      });
      return false;
    }

    if (!isLogin && formData.password.length < 6) {
      setError({
        type: "validation",
        message: "Kata sandi harus minimal 6 karakter",
      });
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError({
        type: "validation",
        message: "Kata sandi dan konfirmasi tidak cocok",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const data = isLogin
        ? await authService.login(formData.email, formData.password)
        : await authService.signup(
            formData.name,
            formData.email,
            formData.password
          );

      const user = authService.saveSession(data);
      if (onSuccess) onSuccess(user);
    } catch (err) {
      // Inline error handling tanpa modal
      const errorType =
        err.statusCode === 401
          ? "auth"
          : err.statusCode === 409
          ? "conflict"
          : err.statusCode === 0
          ? "network"
          : "server";

      setError({
        type: errorType,
        message: err.message || "Terjadi kesalahan tidak terduga",
        details: err.details,
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = isLogin
    ? formData.email && formData.password
    : formData.name && formData.email && formData.password && agreedToTerms;

  return {
    formData,
    loading,
    error,
    agreedToTerms,
    setAgreedToTerms,
    handleChange,
    handleSubmit,
    setError, // Export setError untuk manual error dismissal
    isFormValid,
  };
};
