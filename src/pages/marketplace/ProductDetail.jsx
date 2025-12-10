import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Heart,
  MessageCircle,
  X,
  Home,
  Share2,
  CreditCard,
} from "lucide-react";

// Import Data & Hooks
import { products } from "../../data/mockData";
import { useMidtrans } from "../../hooks/useMidtrans";
import { showSuccess, showError } from "../../utils/alertUtils";

// Import Components
import OrderPopup from "../../components/popup/OrderPopup";
import SellerProfile from "../../components/SellerProfile";
import LoginPopup from "../../components/popup/LoginPopup";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { processPayment } = useMidtrans();

  // State
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // 1. Cari Produk Berdasarkan ID URL
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setSelectedItem(foundProduct);
    }

    // Check if favorited (from localStorage)
    const favorites = JSON.parse(
      localStorage.getItem("unily_favorites") || "[]"
    );
    setIsFavorited(favorites.includes(id));
  }, [id]);

  // Validasi jika produk tidak ketemu
  if (!selectedItem) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Produk tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/home/marketplace")}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        >
          Kembali ke Marketplace
        </button>
      </main>
    );
  }

  // Variabel Helper
  const isService =
    selectedItem.type === "sewa" || selectedItem.type === "Service";
  const images = selectedItem.images || [selectedItem.image];
  const currentImage = images[selectedImageIndex];
  const totalPrice = selectedItem.price * quantity;

  // --- HANDLER TRANSAKSI ---

  // A. Beli Langsung (Midtrans)
  const handleDirectBuy = async () => {
    // Cek Login
    const token = localStorage.getItem("unily_token");
    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    // Buat Order ID Unik
    const orderId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Panggil Midtrans
    await processPayment(orderId, totalPrice, (result) => {
      console.log("Sukses:", result);
    });
  };

  // B. Tambah ke Favorit
  const handleToggleFavorite = () => {
    // Cek Login
    const token = localStorage.getItem("unily_token");
    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    const favorites = JSON.parse(
      localStorage.getItem("unily_favorites") || "[]"
    );

    if (isFavorited) {
      // Remove from favorites
      const updated = favorites.filter((fav) => fav !== id);
      localStorage.setItem("unily_favorites", JSON.stringify(updated));
      setIsFavorited(false);
      showSuccess("Berhasil", "Dihapus dari favorit");
    } else {
      // Add to favorites
      favorites.push(id);
      localStorage.setItem("unily_favorites", JSON.stringify(favorites));
      setIsFavorited(true);
      showSuccess("Berhasil", "Ditambahkan ke favorit");
    }
  };

  // C. Chat Seller
  const handleChatSeller = () => {
    // Cek Login
    const token = localStorage.getItem("unily_token");
    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    // Redirect to messages/chat (placeholder)
    showSuccess("Chat", `Memulai chat dengan ${selectedItem.seller}...`);
    // TODO: Implement actual chat feature
    // navigate(`/messages/${selectedItem.sellerId}`);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600 mb-6">
        <button
          onClick={() => navigate("/")}
          className="hover:text-orange-600 transition-colors"
        >
          <Home size={18} />
        </button>
        <ChevronRight size={16} className="mx-2" />
        <button
          onClick={() => navigate("/marketplace")}
          className="hover:text-orange-600 transition-colors"
        >
          Marketplace
        </button>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900 font-medium truncate">
          {selectedItem.name}
        </span>
      </nav>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* --- KOLOM KIRI: GAMBAR --- */}
        <div className="lg:col-span-3">
          <div
            className="w-full h-[400px] bg-gray-50 rounded-2xl overflow-hidden mb-4 relative cursor-zoom-in border border-gray-100"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src={currentImage}
              alt={selectedItem.name}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    idx === selectedImageIndex
                      ? "border-orange-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="thumb"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- KOLOM KANAN: INFO & BELI --- */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {selectedItem.name}
            </h1>

            {/* Rating & Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="ml-1 font-semibold text-gray-900">
                  {selectedItem.rating}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  ({selectedItem.reviews} Ulasan)
                </span>
              </div>
              {selectedItem.condition && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium uppercase">
                  {selectedItem.condition}
                </span>
              )}
            </div>

            {/* Harga */}
            <div className="mb-8">
              <p className="text-3xl font-bold text-orange-600">
                Rp {selectedItem.price.toLocaleString("id-ID")}
                {selectedItem.unit && (
                  <span className="text-sm text-gray-500 font-normal">
                    {" "}
                    /{selectedItem.unit}
                  </span>
                )}
              </p>
            </div>

            {/* Deskripsi Singkat */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">
                Deskripsi Produk
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedItem.description || selectedItem.desc}
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 text-gray-600"
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-12 text-center text-gray-900 font-medium focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 text-gray-600"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Stok: {selectedItem.stock || 50}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-100">
            <button
              onClick={handleDirectBuy}
              className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Beli Sekarang
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleChatSeller}
                className="flex-1 py-3 border border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-xl font-semibold hover:bg-[oklch(0.4_0.15_140)]/5 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat Seller
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`px-4 border rounded-xl transition-colors ${
                  isFavorited
                    ? "border-red-500 bg-red-50 text-red-500 hover:bg-red-100"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart
                  size={20}
                  className={isFavorited ? "fill-current" : ""}
                />
              </button>
            </div>
          </div>

          {/* Seller Info */}
          <div className="mt-6">
            <SellerProfile
              seller={
                selectedItem.sellerDetail || { name: selectedItem.seller }
              }
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-gray-300">
            <X size={32} />
          </button>
          <img
            src={currentImage}
            className="max-w-full max-h-full object-contain"
            alt="Full"
          />
        </div>
      )}

      {/* Order Popup (Opsional jika masih mau dipakai buat keranjang) */}
      {showOrderPopup && (
        <OrderPopup
          product={{ ...selectedItem, quantity, totalPrice }}
          onClose={() => setShowOrderPopup(false)}
          onOrder={() => {
            setShowOrderPopup(false);
            navigate("/marketplace");
          }}
        />
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onAuthSuccess={() => {
            setShowLoginPopup(false);
            // User sudah login, bisa lanjut aksi
          }}
        />
      )}
    </main>
  );
};

export default ProductDetail;
