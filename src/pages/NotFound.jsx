import React from 'react';
import { FileQuestion } from 'lucide-react';

const NotFound = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <FileQuestion size={80} className="mx-auto text-gray-400 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">ERROR 404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page not found.
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, kami tidak dapat menemukan halaman yang kamu cari. Mungkin materi tersebut sudah dihapus atau kamu salah mengetik URL.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="block w-64 mx-auto bg-[oklch(0.4_0.15_140)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[oklch(0.35_0.15_140)] transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="block w-64 mx-auto text-[oklch(0.4_0.15_140)] hover:underline text-sm"
          >
            ← Kembali ke Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
