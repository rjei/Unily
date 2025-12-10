import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Search,
  ShoppingCart,
  Clock,
  Handshake,
} from "lucide-react";
import ProductCard from "../../components/common/ProductCard";
import LoadingScreen from "../../components/LoadingScreen";
import BulletinPopup from "../../components/popup/BulletinPopup";

// Import data dummy
import { products as mockData } from "../../data/mockData";

const MarketplaceScreen = () => {
  const navigate = useNavigate();

  const [showBulletin, setShowBulletin] = useState(false);
  const [scrollTime, setScrollTime] = useState(0);

  const [activeTab, setActiveTab] = useState("jual");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    sellerType: [],
    location: [],
    priceRange: [0, 100000000],
    condition: [],
    rating: 0,
  });

  const [expandedFilters, setExpandedFilters] = useState({
    sellerType: true,
    location: false,
    price: false,
    condition: false,
    rating: false,
  });

  const [error, setError] = useState(null);

  // Bulletin popup after scrolling
  useEffect(() => {
    let scrollTimer;
    let totalScrollTime = 0;

    const handleScroll = () => {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        totalScrollTime += 1;
        setScrollTime(totalScrollTime);

        // Show bulletin after 10 seconds of scrolling
        if (totalScrollTime >= 10 && !showBulletin) {
          setShowBulletin(true);
        }
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [showBulletin]);

  const tabs = [
    { id: "jual", label: "Beli", icon: ShoppingCart },
    { id: "sewa", label: "Sewa", icon: Clock },
    { id: "pinjam", label: "Pinjam", icon: Handshake },
  ];

  const toggleFilter = (section) => {
    setExpandedFilters((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (
        filterType === "sellerType" ||
        filterType === "location" ||
        filterType === "condition"
      ) {
        const current = prev[filterType];
        if (current.includes(value)) {
          return { ...prev, [filterType]: current.filter((v) => v !== value) };
        } else {
          return { ...prev, [filterType]: [...current, value] };
        }
      }
      return { ...prev, [filterType]: value };
    });
  };

  // --- LOGIKA FILTER ---
  const filteredData = mockData.filter((item) => {
    // 1. Filter Tab
    let matchesTab = true;
    if (activeTab === "jual") {
      matchesTab = !item.rentalType || item.rentalType === "jual";
    } else if (activeTab === "sewa") {
      matchesTab = item.rentalType === "sewa" || item.type === "sewa";
    } else if (activeTab === "pinjam") {
      matchesTab = item.rentalType === "pinjam";
    }

    // 2. Filter Search
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // 3. Filter seller type
    const matchesSellerType =
      filters.sellerType.length === 0 ||
      filters.sellerType.includes(item.seller?.type || "student");

    // 4. Filter location
    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.some((loc) => item.location?.includes(loc));

    // 5. Filter rating
    const matchesRating =
      !filters.rating || (item.rating || 0) >= filters.rating;

    return (
      matchesTab &&
      matchesSearch &&
      matchesSellerType &&
      matchesLocation &&
      matchesRating
    );
  });

  // --- LOGIKA SORTING ---
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0; // popular (default)
  });

  // Handle Klik Barang
  const handleItemClick = (id) => {
    navigate(`/marketplace/detail/${id}`);
  };

  return (
    <>
      <div className="w-full bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center text-sm text-gray-600"
            >
              <button
                onClick={() => navigate("/")}
                aria-label="Kembali ke halaman utama"
                className="hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded p-1"
              >
                <Home size={18} aria-hidden="true" />
              </button>
              <ChevronRight size={16} className="mx-2" aria-hidden="true" />
              <span className="text-gray-900 font-medium" aria-current="page">
                Marketplace
              </span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar Filter - Desktop */}
            <aside
              className="hidden lg:block w-72 shrink-0"
              aria-label="Filter produk"
            >
              <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-200">
                  <SlidersHorizontal
                    size={20}
                    className="text-gray-700"
                    aria-hidden="true"
                  />
                  <h2 className="text-lg font-bold text-gray-900">Filter</h2>
                </div>

                {/* Jenis Toko */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <button
                    onClick={() => toggleFilter("sellerType")}
                    aria-expanded={expandedFilters.sellerType}
                    aria-controls="filter-sellerType"
                    className="flex items-center justify-between w-full mb-3 text-left hover:text-[oklch(0.4_0.15_140)] transition-colors focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)] focus:ring-offset-2 rounded p-1"
                  >
                    <span className="font-semibold text-gray-900">
                      Jenis Toko
                    </span>
                    {expandedFilters.sellerType ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {expandedFilters.sellerType && (
                    <div className="space-y-2">
                      {[
                        { value: "student", label: "Pelajar/Mahasiswa" },
                        { value: "official", label: "Toko Resmi", badge: "✓" },
                        { value: "business", label: "Affiliated Business" },
                        { value: "academic", label: "Civitas Akademis" },
                      ].map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.sellerType.includes(type.value)}
                            onChange={() =>
                              handleFilterChange("sellerType", type.value)
                            }
                            className="w-4 h-4 text-[oklch(0.4_0.15_140)] rounded focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            {type.label}{" "}
                            {type.badge && (
                              <span className="text-green-600">
                                {type.badge}
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lokasi */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <button
                    onClick={() => toggleFilter("location")}
                    className="flex items-center justify-between w-full mb-3"
                  >
                    <span className="font-semibold text-gray-900">Lokasi</span>
                    {expandedFilters.location ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {expandedFilters.location && (
                    <div className="space-y-2">
                      {[
                        "USU (Universitas Sumatera Utara)",
                        "UI (Universitas Indonesia)",
                        "ITB (Institut Teknologi Bandung)",
                        "UGM (Universitas Gadjah Mada)",
                      ].map((loc) => (
                        <label
                          key={loc}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.location.includes(loc)}
                            onChange={() => handleFilterChange("location", loc)}
                            className="w-4 h-4 text-[oklch(0.4_0.15_140)] rounded focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            {loc}
                          </span>
                        </label>
                      ))}
                      <button className="text-sm text-[oklch(0.4_0.15_140)] hover:text-[oklch(0.35_0.15_140)] font-medium">
                        Lihat selengkapnya
                      </button>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <button
                    onClick={() => toggleFilter("rating")}
                    className="flex items-center justify-between w-full mb-3"
                  >
                    <span className="font-semibold text-gray-900">Rating</span>
                    {expandedFilters.rating ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {expandedFilters.rating && (
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() =>
                              handleFilterChange("rating", rating)
                            }
                            className="w-4 h-4 text-[oklch(0.4_0.15_140)] focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20"
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              ke atas
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <button
                  onClick={() =>
                    setFilters({
                      sellerType: [],
                      location: [],
                      priceRange: [0, 100000000],
                      condition: [],
                      rating: 0,
                    })
                  }
                  className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Tabs & Search */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                {/* Tabs */}
                <div
                  role="tablist"
                  aria-label="Kategori produk"
                  className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide"
                >
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`tabpanel-${tab.id}`}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap font-medium transition-all rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          activeTab === tab.id
                            ? "text-white bg-[oklch(0.4_0.15_140)] border-[oklch(0.4_0.15_140)] shadow-md focus:ring-[oklch(0.4_0.15_140)]"
                            : "text-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-gray-400"
                        }`}
                      >
                        <IconComponent size={18} aria-hidden="true" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Cari produk, buku, atau elektronik..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20 focus:border-[oklch(0.4_0.15_140)] transition-all"
                  />
                </div>
              </div>

              {/* Sort & Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  Menampilkan{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredData.length}
                  </span>{" "}
                  produk
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>

              {/* Product Grid */}
              {sortedData.length > 0 ? (
                <div
                  role="region"
                  aria-label="Daftar produk"
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {sortedData.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onClick={() => handleItemClick(item.id)}
                    />
                  ))}
                </div>
              ) : (
                // Empty State
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Produk tidak ditemukan
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Coba kata kunci lain atau ubah filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({
                        sellerType: [],
                        location: [],
                        priceRange: [0, 100000000],
                        condition: [],
                        rating: 0,
                      });
                    }}
                    className="mt-4 text-[oklch(0.4_0.15_140)] font-medium hover:underline text-sm"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bulletin Popup */}
      {showBulletin && <BulletinPopup onClose={() => setShowBulletin(false)} />}
    </>
  );
};

export default MarketplaceScreen;
