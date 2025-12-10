import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const HeroSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const slides = [
    {
      id: 1,
      tag: "#MarketplaceMahasiswa",
      title: "Jual Beli & Sewa",
      highlight: "Khusus Anak Kampus",
      desc: "Platform terpercaya untuk mahasiswa menukar produk, jasa, dan peluang dalam komunitas kampusmu.",
      image: "/mascot.png",
      cta: "Mulai Jelajah",
      gradient: "from-green-50 to-white",
      shadowColor: "bg-green-400/20",
    },
    {
      id: 2,
      tag: "#UnilyStudy",
      title: "Butuh Mentor?",
      highlight: "Siap Tempur UTS/UAS",
      desc: "Jangan belajar sendirian! Temukan kakak tingkat atau teman sebaya yang siap mengajarimu sampai paham.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop",
      cta: "Cari Mentor",
      ctaAction: "/services",
      gradient: "from-orange-50 to-white",
      shadowColor: "bg-orange-400/20",
    },
    {
      id: 3,
      tag: "#JasaKampus",
      title: "Pusat Jasa",
      highlight: "Solusi Tugas & Skripsi",
      desc: "Mulai dari jasa ketik, desain, joki print, hingga service laptop. Semua ada di satu aplikasi.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop",
      cta: "Lihat Jasa",
      gradient: "from-green-50 to-white",
      shadowColor: "bg-green-400/20",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthNavigate = (path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  if (isNavigating) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-700 ease-in-out bg-linear-to-b ${slides[currentSlide].gradient} pt-20 pb-16 mt-8`}
    >
      <div className="container mx-auto px-4 md:px-16 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 min-h-[450px]">
          {/* Text Content */}
          <div
            key={currentSlide}
            className="flex-1 text-left space-y-6 animate-fade-in-up pl-1"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm">
              {slides[currentSlide].tag}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {slides[currentSlide].title}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[oklch(0.4_0.15_140)] to-orange-500">
                {slides[currentSlide].highlight}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed font-medium">
              {slides[currentSlide].desc}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (slides[currentSlide].ctaAction) {
                    navigate(slides[currentSlide].ctaAction);
                  } else {
                    document
                      .getElementById("products-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-block px-8 py-4 bg-gray-900 hover:bg-black text-white text-base font-bold rounded-full shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl active:scale-95"
              >
                {slides[currentSlide].cta}
              </button>
              <button
                onClick={() => handleAuthNavigate("/signup")}
                className="inline-block px-8 py-4 bg-[oklch(0.4_0.15_140)] hover:bg-[oklch(0.35_0.15_140)] text-white text-base font-bold rounded-full shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl active:scale-95"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative w-full flex justify-center md:justify-end">
            <div className="relative w-[350px] md:w-[450px] aspect-square flex items-center justify-center">
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[60px] transition-colors duration-1000 ${slides[currentSlide].shadowColor}`}
              ></div>
              <img
                key={currentSlide}
                src={slides[currentSlide].image}
                alt="Hero Visual"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center md:justify-start gap-2 mt-8 md:mt-0 md:absolute md:bottom-0 md:left-16 pl-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === idx
                  ? "w-8 bg-gray-800"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
