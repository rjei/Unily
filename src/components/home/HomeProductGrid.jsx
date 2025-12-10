import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutList, ChevronRight } from "lucide-react";
import ProductCard from "../common/ProductCard"; // Cek path import ProductCard
import { mockProductsData } from "../../data/mockData"; // Cek path import mockData

const HomeProductGrid = () => {
  const navigate = useNavigate();
  const displayProducts = (mockProductsData || []).slice(0, 4);

  return (
    <div className="container mx-auto px-4 md:px-16 py-16 max-w-7xl" id="products-section">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[oklch(0.4_0.15_140)] mb-1">
            <LayoutList size={20} />
            <span className="font-bold text-sm tracking-wide uppercase">Rekomendasi</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Paling Dicari Minggu Ini 🔥</h2>
        </div>
        <button 
          onClick={() => navigate("/marketplace")} 
          className="hidden md:flex items-center gap-1 text-[oklch(0.4_0.15_140)] font-semibold hover:underline"
        >
          Lihat Semua <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/marketplace/detail/${item.id}`)}
            showOfficial={true}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <button
          onClick={() => navigate("/marketplace")}
          className="w-full py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Lihat Semua
        </button>
      </div>
    </div>
  );
};

export default HomeProductGrid;