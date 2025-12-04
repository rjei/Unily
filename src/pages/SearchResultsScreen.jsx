import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";

const SearchResultsScreen = ({
  searchQuery,
  onNavigate,
  products,
  services,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    sellerType: [],
    location: [],
    priceMin: "",
    priceMax: "",
    condition: [],
    rating: [],
    offers: [],
    sortBy: "newest",
  });
  const [expandedSections, setExpandedSections] = useState({
    sellerType: true,
    location: true,
    price: false,
    condition: false,
    rating: false,
    offers: false,
    sort: false,
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, [searchQuery]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const allItems = [...(products || []), ...(services || [])];

  // Filter items
  let filteredItems = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply filters
  if (filters.sellerType.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      filters.sellerType.includes(item.sellerType || "student")
    );
  }

  if (filters.location.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      filters.location.some((loc) => item.location?.includes(loc))
    );
  }

  if (filters.condition.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      filters.condition.includes(item.condition || "new")
    );
  }

  // Sorting
  if (filters.sortBy === "price-asc") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price-desc") {
    filteredItems.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === "rating") {
    filteredItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between text-left font-semibold text-gray-800 text-sm"
      >
        {title}
        {expandedSections[section] ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>
      {expandedSections[section] && (
        <div className="mt-3 space-y-2">{children}</div>
      )}
    </div>
  );

  const Checkbox = ({ label, checked, onChange, badge }) => (
    <label className="flex items-center gap-2 cursor-pointer hover:text-[oklch(0.4_0.15_140)] transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
      />
      <span className="text-sm text-gray-700 flex items-center gap-2">
        {label}
        {badge && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
            {badge}
          </span>
        )}
      </span>
    </label>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="w-full h-48 bg-gray-200 animate-shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/2" />
            <div className="h-6 bg-gray-200 rounded animate-shimmer w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-[oklch(0.4_0.15_140)]"
        >
          Beranda
        </button>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Hasil Pencarian: "{searchQuery}"</span>
      </nav>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar Filter */}
        <aside className="w-64 shrink-0 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-20">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <SlidersHorizontal size={20} className="text-gray-700" />
            <h2 className="font-bold text-gray-900">Filter</h2>
          </div>

          {/* Jenis Toko */}
          <FilterSection title="Jenis Toko" section="sellerType">
            <Checkbox
              label="Pelajar/Mahasiswa"
              checked={filters.sellerType.includes("student")}
              onChange={() => toggleFilter("sellerType", "student")}
            />
            <Checkbox
              label="Toko Resmi"
              checked={filters.sellerType.includes("official")}
              onChange={() => toggleFilter("sellerType", "official")}
              badge="✓"
            />
            <Checkbox
              label="Affiliated Business"
              checked={filters.sellerType.includes("affiliated")}
              onChange={() => toggleFilter("sellerType", "affiliated")}
            />
            <Checkbox
              label="Civitas Akademis"
              checked={filters.sellerType.includes("civitas")}
              onChange={() => toggleFilter("sellerType", "civitas")}
            />
          </FilterSection>

          {/* Lokasi */}
          <FilterSection title="Lokasi" section="location">
            <Checkbox
              label="USU (Universitas Sumatera Utara)"
              checked={filters.location.includes("USU")}
              onChange={() => toggleFilter("location", "USU")}
            />
            <Checkbox
              label="UI (Universitas Indonesia)"
              checked={filters.location.includes("UI")}
              onChange={() => toggleFilter("location", "UI")}
            />
            <Checkbox
              label="ITB (Institut Teknologi Bandung)"
              checked={filters.location.includes("ITB")}
              onChange={() => toggleFilter("location", "ITB")}
            />
            <Checkbox
              label="UGM (Universitas Gadjah Mada)"
              checked={filters.location.includes("UGM")}
              onChange={() => toggleFilter("location", "UGM")}
            />
            <button className="text-sm text-[oklch(0.4_0.15_140)] hover:underline mt-1">
              Lihat selengkapnya
            </button>
          </FilterSection>

          {/* Harga */}
          <FilterSection title="Harga" section="price">
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Harga Minimum"
                value={filters.priceMin}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, priceMin: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[oklch(0.4_0.15_140)]"
              />
              <input
                type="number"
                placeholder="Harga Maksimum"
                value={filters.priceMax}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, priceMax: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[oklch(0.4_0.15_140)]"
              />
            </div>
          </FilterSection>

          {/* Kondisi */}
          <FilterSection title="Kondisi" section="condition">
            <Checkbox
              label="Baru"
              checked={filters.condition.includes("new")}
              onChange={() => toggleFilter("condition", "new")}
            />
            <Checkbox
              label="Bekas"
              checked={filters.condition.includes("used")}
              onChange={() => toggleFilter("condition", "used")}
            />
          </FilterSection>

          {/* Rating */}
          <FilterSection title="Rating" section="rating">
            {[4, 3, 2, 1].map((rating) => (
              <Checkbox
                key={rating}
                label={`${rating} ⭐ ke atas`}
                checked={filters.rating.includes(rating)}
                onChange={() => toggleFilter("rating", rating)}
              />
            ))}
          </FilterSection>

          {/* Penawaran */}
          <FilterSection title="Penawaran" section="offers">
            <Checkbox
              label="Gratis Ongkir"
              checked={filters.offers.includes("free-shipping")}
              onChange={() => toggleFilter("offers", "free-shipping")}
            />
            <Checkbox
              label="Harga Diskon"
              checked={filters.offers.includes("discount")}
              onChange={() => toggleFilter("offers", "discount")}
            />
          </FilterSection>

          {/* Urutkan */}
          <FilterSection title="Urutkan" section="sort">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === "newest"}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "newest" }))
                }
                className="text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
              />
              <span className="text-sm text-gray-700">
                Terakhir Ditambahkan
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === "price-asc"}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "price-asc" }))
                }
                className="text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
              />
              <span className="text-sm text-gray-700">Harga Terendah</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === "price-desc"}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "price-desc" }))
                }
                className="text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
              />
              <span className="text-sm text-gray-700">Harga Tertinggi</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === "rating"}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "rating" }))
                }
                className="text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
              />
              <span className="text-sm text-gray-700">Rating Tertinggi</span>
            </label>
          </FilterSection>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              {isLoading
                ? "Mencari..."
                : `${filteredItems.length} Hasil ditemukan`}
            </h1>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Tidak ada produk ditemukan
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onClick={() => onNavigate("details", item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchResultsScreen;
