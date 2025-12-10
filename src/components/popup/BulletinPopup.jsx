import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const BulletinPopup = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "🎉 Flash Sale Hari Ini!",
      description: "Diskon hingga 50% untuk produk elektronik pilihan",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
      features: [
        "Laptop & Tablet mulai Rp 2 juta",
        "Gratis ongkir se-kampus",
        "Cashback 10% untuk pengguna baru",
      ],
      cta: "Belanja Sekarang",
      badge: "PROMO",
    },
    {
      id: 2,
      title: "📚 Sewa Buku Kuliah Hemat!",
      description: "Hemat hingga 70% dengan sistem sewa buku semester",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      features: [
        "Koleksi lengkap semua jurusan",
        "Sistem sewa fleksibel",
        "Kondisi buku terjamin bagus",
      ],
      cta: "Cek Katalog",
      badge: "HEMAT",
    },
    {
      id: 3,
      title: "💼 Jadi Seller, Raih Cuan!",
      description: "Mulai berjualan dan monetize skillmu sekarang",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      features: [
        "Daftar seller 100% gratis",
        "Dashboard lengkap & mudah",
        "Komisi 0% untuk 3 bulan pertama",
      ],
      cta: "Daftar Seller",
      badge: "GRATIS",
    },
    {
      id: 4,
      title: "🎓 Jasa Les & Mentoring",
      description: "Tingkatkan IPK dengan mentor terbaik di kampus",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      features: [
        "Mentor berpengalaman IPK > 3.5",
        "Jadwal fleksibel sesuai kebutuhan",
        "Garansi nilai atau uang kembali",
      ],
      cta: "Cari Mentor",
      badge: "POPULER",
    },
    {
      id: 5,
      title: "🏪 Partner Resmi Toko Kampus",
      description: "Belanja kebutuhan kampus dari toko official verified",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800",
      features: [
        "Gramedia, Indomaret, Alfamart",
        "Harga sama dengan toko fisik",
        "Poin reward setiap pembelian",
      ],
      cta: "Lihat Toko",
      badge: "OFFICIAL",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X size={20} className="text-gray-700" />
        </button>

        <div className="relative">
          <div className="w-full h-64 bg-white overflow-hidden relative">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Badge Promo */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {slides[currentSlide].badge}
            </div>
          </div>

          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-600 mb-6">
            {slides[currentSlide].description}
          </p>

          <div className="space-y-3 mb-6">
            {slides[currentSlide].features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle
                  className="text-[oklch(0.4_0.15_140)] shrink-0 mt-0.5"
                  size={20}
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              Nanti Saja
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-[oklch(0.4_0.15_140)] text-white rounded-xl font-medium hover:bg-[oklch(0.35_0.15_140)] transition-colors text-sm"
            >
              {slides[currentSlide].cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinPopup;
