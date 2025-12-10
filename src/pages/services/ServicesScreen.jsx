import React, { useState } from "react";
import { ChevronRight, Filter, Home, Star, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockServicesData } from "../../data/mockData";

const ServicesScreen = ({ onNavigate }) => {
  const navigate = useNavigate();

  // Fallback for missing onNavigate prop
  if (!onNavigate) {
    console.warn("onNavigate is missing, using useNavigate fallback");
    onNavigate = (page, data) => {
      navigate(`/services/${page}`, { state: data });
    };
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [sortBy, setSortBy] = useState("popular");

  // Kategori statis berdasarkan data
  const categories = [
    { id: "semua", label: "Semua Jasa", count: mockServicesData.length },
    {
      id: "desain",
      label: "Desain",
      count: mockServicesData.filter((s) => s.category === "Desain").length,
    },
    {
      id: "pendidikan",
      label: "Pendidikan",
      count: mockServicesData.filter((s) => s.category === "Pendidikan").length,
    },
    {
      id: "bisnis",
      label: "Bisnis",
      count: mockServicesData.filter((s) => s.category === "Bisnis").length,
    },
    {
      id: "bahasa",
      label: "Bahasa",
      count: mockServicesData.filter((s) => s.category === "Bahasa").length,
    },
  ];

  // Logic Filter
  const filteredData = mockServicesData.filter((item) => {
    const matchesCategory =
      selectedCategory === "semua" ||
      item.category.toLowerCase() === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Logic Sort
  let sortedData = [...filteredData];
  if (sortBy === "price-low") sortedData.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high")
    sortedData.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") sortedData.sort((a, b) => b.rating - a.rating);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-orange-500 transition-colors flex items-center"
              aria-label="Kembali ke Home"
            >
              <Home size={18} />
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Tawarkan Jasamu</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Kategori */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 h-fit sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-orange-500" /> Kategori Jasa
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-orange-100 text-orange-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat.label}
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* List Jasa */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Menampilkan{" "}
                <span className="font-semibold">{filteredData.length}</span>{" "}
                jasa
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm"
              >
                <option value="popular">Paling Populer</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            {filteredData.length > 0 ? (
              <div className="space-y-4">
                {filteredData.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => onNavigate("details", service)}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex gap-4 p-4 group"
                  >
                    <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                            {service.name}
                          </h3>
                          {service.seller?.badge && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                              {service.seller.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          {/* Rating */}
                          <div className="flex items-center text-yellow-500">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {service.rating}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            ({service.reviews} ulasan)
                          </span>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500">Mulai dari</p>
                          <p className="text-lg font-bold text-orange-500">
                            Rp {service.price.toLocaleString("id-ID")}
                            {/* 🔥 FIX: Menggunakan service.unit, bukan service.priceFormat */}
                            <span className="text-sm text-gray-500 font-normal">
                              /{service.unit}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border">
                <p className="text-gray-600">Jasa tidak ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;
