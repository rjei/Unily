import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Home, RefreshCcw, AlertTriangle, FileQuestion } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const is404 = error?.status === 404;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] text-gray-600 px-4">
      {/* Container Minimalis */}
      <div className="max-w-md w-full text-center">
        
        {/* Icon Sederhana & Tenang */}
        <div className="mb-8 flex justify-center">
          <div className={`p-4 rounded-2xl ${is404 ? "bg-gray-100" : "bg-orange-50"}`}>
            {is404 ? (
              <FileQuestion size={48} className="text-gray-400" strokeWidth={1.5} />
            ) : (
              <AlertTriangle size={48} className="text-orange-400" strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Typography: Clear & Humanist */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          {is404 ? "Halaman Tidak Ditemukan" : "Terjadi Kendala Teknis"}
        </h1>
        
        <p className="text-sm leading-relaxed text-gray-500 mb-8 max-w-sm mx-auto">
          {is404 
            ? "Kami sudah mencari ke segala arah, tapi halaman yang kamu tuju sepertinya sudah pindah atau tidak ada."
            : "Sistem mengalami sedikit gangguan saat memproses permintaanmu. Tidak perlu panik, data kamu aman."}
        </p>

        {/* Technical Error (Disembunyikan dgn rapi/kecil) */}
        {!is404 && error && (
          <div className="mb-8 bg-white border border-gray-100 rounded-lg p-3 text-left shadow-sm">
            <code className="text-xs font-mono text-red-400 block overflow-auto max-h-20 whitespace-pre-wrap">
              Error: {error.statusText || error.message}
            </code>
          </div>
        )}

        {/* Actions: Hierarki Jelas */}
        <div className="flex flex-col gap-3">
          {/* Primary Action: Hijau Unily (Eye soothing green) */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-[oklch(0.4_0.15_140)] hover:bg-[oklch(0.35_0.15_140)] text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
          >
            <Home size={18} />
            Kembali ke Beranda
          </button>
          
          {/* Secondary Action: Subtle Gray */}
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-medium transition-colors"
          >
            <RefreshCcw size={18} />
            Muat Ulang Halaman
          </button>
        </div>

        {/* Footer Support Link */}
        <div className="mt-12">
          <a href="#" className="text-xs text-gray-400 hover:text-[oklch(0.4_0.15_140)] transition-colors">
            Butuh bantuan? Hubungi Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;