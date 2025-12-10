import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Tambah useLocation untuk cek currentPage
import { Briefcase, LayoutList, Store } from "lucide-react";

// --- CATATAN PENTING ---
// Component ini perlu tahu siapa user yang login (currentUser)
// dan halaman apa yang sedang dibuka (currentPage).
// Kita akan ambil data ini dari MainLayout.jsx.

const PrimaryNav = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Tentukan apakah user sedang di halaman Jasa (Services)
  const isServicesPage = location.pathname.startsWith("/services");

  // Tentukan apakah user sedang di halaman Marketplace/Home
  const isMarketplacePage =
    location.pathname === "/" || location.pathname.startsWith("/marketplace");

  // 1. Tentukan Background Color (Hijau ke Oren)
  const bgColor = isServicesPage
    ? "bg-linear-to-r from-orange-600 via-orange-500 to-orange-600"
    : "bg-linear-to-r from-[oklch(0.45_0.15_140)] via-[oklch(0.4_0.15_140)] to-[oklch(0.35_0.15_140)]";

  // 2. Tentukan Teks & Path Tombol Penjual (Sesuai kode lama)
  const isSeller = currentUser && currentUser.role === "penjual"; // Backend menggunakan 'penjual'
  const sellerButtonText = isSeller ? "Toko Saya" : "Mulai Berjualan";
  const sellerButtonPath = isSeller ? "/seller" : "/seller/register";

  // 3. Tentukan Kategori Dinamis (Sesuai kode lama)
  const categories = isServicesPage
    ? ["Jasa Desain", "Tutor Privat", "Editing", "Proofreading", "Buletin"]
    : ["Elektronik", "Buku", "Olahraga", "Jasa Les", "Buletin"];

  return (
    // FIX POSITION: top-20 (Turun 80px), z-40 (Di bawah Navbar Putih)
    <div
      className={`fixed top-18 left-0 right-0 h-12 ${bgColor} text-white z-20 px-4 md:px-16 flex items-center shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center text-sm font-medium">
        {/* === KIRI: Tombol Seller Kondisional === */}
        <div className="flex items-center space-x-6">
          <Link
            to={sellerButtonPath} // Menggunakan Link atau navigate untuk navigasi
            className="text-sm font-semibold text-white/90 hover:text-white rounded-lg py-2.5 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <Store
              size={16}
              className={isSeller ? "text-white" : "text-white/70"}
            />
            <span>{sellerButtonText}</span>
          </Link>
        </div>

        {/* === TENGAH: Main Navigation (Marketplace / Jasa) === */}
        <div className="flex items-center space-x-2">
          {/* Tombol Marketplace */}
          <Link
            to="/marketplace" // Arahkan ke /marketplace atau /
            className={`cursor-pointer py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 flex items-center ${
              isMarketplacePage
                ? "bg-white/20 backdrop-blur-md text-white font-semibold shadow-sm border border-white/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <LayoutList size={16} className="inline-block mr-1.5" />
            Marketplace
          </Link>

          {/* Tombol Pusat Jasa */}
          <Link
            to="/services"
            className={`cursor-pointer py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 flex items-center ${
              isServicesPage
                ? "bg-white/20 backdrop-blur-md text-white font-semibold shadow-sm border border-white/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <Briefcase size={16} className="inline-block mr-1.5" />
            Pusat Jasa
          </Link>
        </div>

        {/* === KANAN: Category Links (Dinami) === */}
        <div className="hidden lg:flex items-center space-x-4 text-xs">
          {categories.map((category) => (
            <button
              key={category}
              // ✅ Navigasi ke halaman search berdasarkan kategori
              onClick={() =>
                navigate(`/search?cat=${encodeURIComponent(category)}`)
              }
              className="text-white/90 hover:text-white font-medium transition-all duration-300 whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimaryNav;
