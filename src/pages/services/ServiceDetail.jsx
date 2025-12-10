import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import {
  ChevronRight,
  Star,
  Heart,
  MessageCircle,
  X,
  Home,
  Share2,
  Clock,
  Award,
  Users,
  CheckCircle,
  Calendar
} from "lucide-react";

// Import Data & Hooks
import { services } from "../../data/mockData"; 
import { useMidtrans } from "../../hooks/useMidtrans"; 
import { showSuccess, showError } from "../../utils/alertUtils";

// 👇 INI YANG TADI ERROR (Sekarang sudah benar path-nya)
import OrderPopup from "../../components/popup/OrderPopup"; 
import SellerProfile from "../../components/SellerProfile";

const ServiceDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { processPayment } = useMidtrans();

  // State
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. Cari Service Berdasarkan ID
  useEffect(() => {
    const foundService = services.find((s) => s.id === id);
    if (foundService) {
      setSelectedItem(foundService);
    }
  }, [id]);

  if (!selectedItem) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Layanan tidak ditemukan</h2>
        <button
          onClick={() => navigate("/home/services")}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        >
          Kembali ke Layanan
        </button>
      </main>
    );
  }

  const totalPrice = selectedItem.price * quantity;

  // --- HANDLER TRANSAKSI ---
  const handleBooking = async () => {
    // Cek Login
    const token = localStorage.getItem("token");
    if (!token) {
      showError("Login Diperlukan", "Silakan login untuk memesan jasa.");
      navigate("/auth/login");
      return;
    }

    // Buat Order ID Unik (Format: SVC-Timestamp)
    const orderId = `SVC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Panggil Midtrans
    await processPayment(orderId, totalPrice, (result) => {
      console.log("Booking Sukses:", result);
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600 mb-6">
        <button onClick={() => navigate("/home")} className="hover:text-orange-600">
          <Home size={16} />
        </button>
        <ChevronRight size={16} className="mx-2" />
        <button onClick={() => navigate("/home/services")} className="hover:text-orange-600">
          Services
        </button>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900 font-medium truncate">{selectedItem.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* --- KOLOM KIRI: GAMBAR & INFO JASA --- */}
        <div className="lg:col-span-3">
          <div
            className="w-full h-[400px] bg-gray-50 rounded-2xl overflow-hidden mb-6 relative cursor-pointer group"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm flex items-center gap-1">
               <Award size={14} className="text-orange-500" />
               Jasa Terverifikasi
            </div>
          </div>

          {/* Tab Informasi */}
          <div className="space-y-6">
             <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                   <Users size={20} className="text-orange-600" /> 
                   Deskripsi Layanan
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                   {selectedItem.description}
                </p>
             </div>

             {/* Fitur / Benefit (Static Demo) */}
             <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                <h4 className="font-semibold text-gray-900 mb-3">Keuntungan Jasa Ini:</h4>
                <ul className="space-y-2">
                   <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <span>Pengerjaan Cepat & Tepat Waktu</span>
                   </li>
                   <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <span>Revisi sampai puas (Maks. 2x)</span>
                   </li>
                   <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      <span>Dikerjakan oleh Mahasiswa Berpengalaman</span>
                   </li>
                </ul>
             </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: BOOKING FORM --- */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="text-yellow-400 fill-current" />
              <span className="font-semibold">{selectedItem.rating}</span>
              <span className="text-gray-400">({selectedItem.reviews} Review)</span>
            </div>

            {/* Harga */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <p className="text-3xl font-bold text-orange-600">
                Rp {selectedItem.price.toLocaleString("id-ID")}
                {selectedItem.unit && <span className="text-sm text-gray-500 font-normal"> /{selectedItem.unit}</span>}
              </p>
            </div>

            {/* Input Quantity/Durasi */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                 Durasi / Jumlah {selectedItem.unit || "Unit"}
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl w-full">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-l-xl"
                >-</button>
                <input 
                  type="text" 
                  readOnly 
                  value={quantity} 
                  className="w-full text-center text-gray-900 font-medium focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-r-xl"
                >+</button>
              </div>
            </div>

            {/* Total & Button */}
            <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-600">
               <span>Total Pembayaran:</span>
               <span className="text-lg font-bold text-gray-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
               </span>
            </div>

            <button
              onClick={handleBooking}
              className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 mb-3 shadow-lg"
            >
              <Calendar size={18} />
              Booking Sekarang
            </button>

            <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
               <MessageCircle size={18} />
               Chat Penyedia Jasa
            </button>

            {/* Seller Info Mini */}
            <div className="mt-6 pt-6 border-t border-gray-100">
               <p className="text-xs text-gray-500 mb-3 uppercase font-bold tracking-wider">Disediakan Oleh</p>
               <SellerProfile seller={selectedItem.sellerDetail || { name: selectedItem.seller }} />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-gray-300">
            <X size={32} />
          </button>
          <img src={selectedItem.image} className="max-w-full max-h-full object-contain" alt="Full" />
        </div>
      )}
    </main>
  );
};

export default ServiceDetail;