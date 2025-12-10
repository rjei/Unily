import React from "react";
// Import hook navigasi yang benar
import { useNavigate } from "react-router-dom"; 

const NotFound = () => {
  const navigate = useNavigate(); // Inisialisasi hook

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-600 mt-2 mb-8">
        Maaf, halaman yang Anda cari mungkin telah dihapus atau link rusak.
      </p>
      
      {/* Tombol Kembali ke Beranda */}
      <button
        onClick={() => navigate("/")} // Pakai navigate(), bukan onNavigate
        className="bg-[oklch(0.4_0.15_140)] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFound;