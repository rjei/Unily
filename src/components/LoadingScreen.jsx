import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Logo and Name */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="Unily"
          className="w-24 h-24 object-contain mb-4 animate-pulse"
        />
        <h1 className="text-4xl font-extrabold text-[oklch(0.4_0.15_140)] mb-2">
          Unily
        </h1>
      </div>

      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[oklch(0.4_0.15_140)] rounded-full border-t-transparent animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-600 text-sm animate-pulse">
        Memuat ruang belajarmu...
      </p>
    </div>
  );
};

export default LoadingScreen;
