import React from "react";
import { Briefcase, LayoutList } from "lucide-react";

const PrimaryNav = ({ currentPage, onNavigate }) => {
  // Determine which categories to show based on current page
  const categories =
    currentPage === "services"
      ? ["Jasa Desain", "Tutor Privat", "Editing", "Proofreading", "Bulletin"]
      : ["Elektronik", "Buku", "Olahraga", "Jasa Les", "Bulletin"];

  const isServicesPage = currentPage === "services";
  const bgColor = isServicesPage
    ? "bg-linear-to-r from-orange-600 via-orange-500 to-orange-600"
    : "bg-linear-to-r from-[oklch(0.45_0.15_140)] via-[oklch(0.4_0.15_140)] to-[oklch(0.35_0.15_140)]";

  return (
    <div className={`${bgColor} shadow-sm sticky top-[60px] z-50`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-2">
          {/* Left - Mulai Berjualan */}
          <button
            onClick={() => onNavigate("daftar_seller")}
            className="text-sm font-semibold text-white/90 hover:text-white rounded-lg py-2.5 px-4 transition-all duration-300"
          >
            {isServicesPage ? "Tawarkan Jasamu" : "Mulai Berjualan"}
          </button>

          {/* Center - Main Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate("home")}
              className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
                currentPage === "home"
                  ? "bg-white/20 backdrop-blur-md text-white font-semibold shadow-sm border border-white/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <LayoutList size={16} className="inline-block mr-1.5" />
              Marketplace, Sewa & Pinjam
            </button>
            <button
              onClick={() => onNavigate("services")}
              className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
                currentPage === "services"
                  ? "bg-white/20 backdrop-blur-md text-white font-semibold shadow-sm border border-white/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Briefcase size={16} className="inline-block mr-1.5" />
              Pusat Jasa
            </button>
          </div>

          {/* Right - Category Links - Dynamic based on current page */}
          <div className="flex items-center space-x-4 text-xs">
            {categories.map((category) => (
              <button
                key={category}
                className="text-white/90 hover:text-white font-medium transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryNav;
