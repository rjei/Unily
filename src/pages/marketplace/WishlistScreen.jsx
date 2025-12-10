import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ChevronRight, Heart, X } from "lucide-react";
import ProductCard from "../../components/common/ProductCard";

// Import data dummy
import { products as mockData } from "../../data/mockData";

const WishlistScreen = () => {
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("unily_wishlist") || "[]");
    setWishlistIds(wishlist);

    // Filter products that are in wishlist
    const filtered = mockData.filter((product) =>
      wishlist.includes(product.id)
    );
    setWishlistProducts(filtered);
  }, []);

  const handleProductClick = (id) => {
    navigate(`/marketplace/${id}`);
  };

  const handleClearWishlist = () => {
    if (confirm("Hapus semua produk dari wishlist?")) {
      localStorage.setItem("unily_wishlist", JSON.stringify([]));
      setWishlistIds([]);
      setWishlistProducts([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Breadcrumb */}
      <nav
        className="bg-white border-b px-4 sm:px-6 py-3"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-[oklch(0.4_0.15_140)] transition-colors flex items-center gap-1"
            >
              <Home size={18} />
              <span>Home</span>
            </button>
          </li>
          <ChevronRight size={16} className="text-gray-400" />
          <li className="text-[oklch(0.4_0.15_140)] font-medium flex items-center gap-1">
            <Heart size={16} />
            Wishlist
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart size={32} className="text-red-500" />
                Wishlist Saya
              </h1>
              <p className="text-gray-600 mt-2">
                {wishlistProducts.length} produk tersimpan
              </p>
            </div>
            {wishlistProducts.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <X size={18} />
                Hapus Semua
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Wishlist Kosong
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Belum ada produk yang kamu simpan. Yuk mulai tambahkan produk
              favorit ke wishlist!
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="px-6 py-3 bg-[oklch(0.4_0.15_140)] text-white rounded-lg hover:bg-[oklch(0.35_0.15_140)] transition-colors"
            >
              Jelajahi Marketplace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistScreen;
