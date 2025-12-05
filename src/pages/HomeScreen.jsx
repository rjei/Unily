import React, { useState, useEffect } from "react";
import { Briefcase, ChevronRight, LayoutList } from "lucide-react";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({
  searchText,
  setSearchText,
  handleSearch,
  onNavigate,
  services,
  products,
  bulletin,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Sewa dan Jual",
      subtitle: "Khusus Kampus",
      description: "Temukan kebutuhan fisik & skill terverifikasi",
      bgColor: "from-white via-gray-50 to-gray-100",
      image: "/mascot.png",
      fallback: "https://i.imgur.com/8yQzVqS.png",
      features: [
        "Terverifikasi Kampus",
        "Hemat Biaya & Waktu",
        "Chat Langsung In-App",
      ],
    },
    {
      title: "Unily Study",
      subtitle: "Siap Tempur UTS/UAS?",
      description:
        "Dapatkan mentor terbaik dari fakultasmu. Daftar sekarang untuk les intensif!",
      bgColor: "from-white via-gray-50 to-gray-100",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      fallback:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      features: ["Mentor Terbaik", "Les Intensif", "Hasil Maksimal"],
    },
    {
      title: "Solusi Kampus",
      subtitle: "Terpercaya",
      description:
        "Unily menghubungkan mahasiswa dengan barang & jasa yang dibutuhkan dalam satu platform aman",
      bgColor: "from-white via-gray-50 to-gray-100",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
      fallback:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
      features: ["Platform Aman", "Transaksi Mudah", "Support 24/7"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section with Full Slide */}
      <div
        className={`relative w-full h-[800px] bg-linear-to-br ${slides[currentSlide].bgColor} overflow-hidden transition-all duration-1000`}
      >
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600')",
          }}
        ></div>

        {/* Content Container */}
        <div className="relative container mx-auto px-12 py-16 h-full max-w-7xl">
          <div className="grid grid-cols-2 gap-16 items-center h-full">
            {/* Left Side - Text and Stats with Slide Transition */}
            <div key={currentSlide} className="animate-fadeIn">
              {/* Hero Text */}
              <div className="mb-12">
                <h1 className="text-6xl font-extrabold leading-tight mb-4">
                  <span className="text-gray-800">
                    {slides[currentSlide].title}
                  </span>
                  <br />
                  <span className="text-[oklch(0.4_0.15_140)]">
                    {slides[currentSlide].subtitle}
                  </span>
                </h1>
                <p className="text-lg text-gray-700 font-medium">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex items-center gap-4 mb-6">
                {/* Stat Card 1 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl w-40 transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-[oklch(0.4_0.15_140)] mb-1">
                    1000+
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Produk & Jasa
                    <br />
                    Tersedia
                  </p>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-[oklch(0.4_0.15_140)]/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl w-40 transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-white mb-1">100%</div>
                  <p className="text-xs text-white font-medium">
                    Terverifikasi
                    <br />
                    Kampus
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("products-section");
                  if (productsSection) {
                    productsSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="bg-[oklch(0.4_0.15_140)] hover:opacity-80 text-white font-bold text-base px-6 py-3 rounded-full shadow-2xl transition-opacity duration-300"
              >
                MULAI CARI SEKARANG
              </button>
            </div>

            {/* Right Side - Image/Mascot and Bulletin Card */}
            <div className="relative flex flex-col items-center justify-between h-full">
              {/* Decorative Background Circle */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75"></div>

              {/* Image/Mascot with Center Padding - Larger Size */}
              <div className="relative z-10 px-20 py-8">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-[480px] h-[360px] object-contain rounded-2xl"
                  style={{
                    filter:
                      currentSlide === 0
                        ? "drop-shadow(0 10px 30px rgba(0,0,0,0.15))"
                        : "none",
                  }}
                  onError={(e) => {
                    e.target.src = slides[currentSlide].fallback;
                  }}
                />
              </div>

              {/* Bulletin Card - Inside Hero Section */}
              <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl w-full max-w-sm">
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  {slides[currentSlide].title} {slides[currentSlide].subtitle}
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  {slides[currentSlide].description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {slides[currentSlide].features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-xs text-gray-700"
                    >
                      <div className="w-5 h-5 rounded-full bg-[oklch(0.4_0.15_140)]/20 flex items-center justify-center mr-2">
                        <svg
                          className="w-3 h-3 text-[oklch(0.4_0.15_140)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Slide Indicators - More Visible */}
                <div className="flex justify-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentSlide
                          ? "bg-[oklch(0.4_0.15_140)] w-8"
                          : "bg-gray-300 hover:bg-gray-400 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <section className="mb-16" id="products-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <LayoutList
                size={28}
                className="mr-3 text-[oklch(0.4_0.15_140)]"
              />{" "}
              Barang Sewa & Jual Terpopuler
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.slice(0, 3).map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onClick={() => onNavigate("details", item)}
                showOfficial={true}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => onNavigate("home")}
              className="px-8 py-3 bg-white border-2 border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-full font-semibold hover:bg-[oklch(0.4_0.15_140)] hover:text-white transition-all shadow-md"
            >
              Muat Lebih Banyak
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeScreen;
