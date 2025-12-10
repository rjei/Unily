// API Configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Helper Request dengan error handling yang lebih baik
const request = async (endpoint, method, body) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Otomatis selipkan token jika ada
    const token = localStorage.getItem("unily_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      // Return error dengan status code untuk inline handling
      const error = new Error(
        data.message || data.error || "Terjadi kesalahan pada server"
      );
      error.statusCode = response.status;
      error.details = data.details || null;
      throw error;
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (!error.statusCode) {
      error.statusCode = 0; // Network error
      error.message =
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }
    throw error;
  }
};

// --- AUTH FUNCTIONS (CLEAN VERSION) ---

const login = async (email, password) => {
  // Langsung tembak API backend
  // URL akhir: http://localhost:4000/api/auth/login
  return await request("/auth/login", "POST", { email, password });
};

const signup = async (name, email, password) => {
  // URL akhir: http://localhost:4000/api/auth/signup (sesuai dengan backend route)
  return await request("/auth/signup", "POST", { name, email, password });
};

const logout = () => {
  localStorage.removeItem("unily_token");
  localStorage.removeItem("unily_user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("unily_user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

const saveSession = (data) => {
  if (data.token) {
    localStorage.setItem("unily_token", data.token);
  }

  if (data.user || data.data) {
    const userData = data.user || data.data;
    localStorage.setItem("unily_user", JSON.stringify(userData));
    return userData;
  }
};

export const authService = {
  login,
  signup,
  logout,
  getCurrentUser,
  saveSession,
};

export default authService;
