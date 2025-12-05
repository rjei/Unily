import React, { useState } from "react";
import OrderPopup from "../components/OrderPopup";
import {
  ChevronRight,
  Star,
  Heart,
  MessageCircle,
  X,
  Home,
  Share2,
} from "lucide-react";

const ProductDetailScreen = ({
  selectedItem,
  onNavigate,
  onCheckout,
  currentUser,
  onShowLoginPopup,
}) => {
  const [showOrder, setShowOrder] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!selectedItem) return null;
  const isService = selectedItem.type === "Service";

  // Mock variants for demonstration
  const variants = isService
    ? []
    : [
        { id: 1, name: "Black Gloss-Visor Silver", available: true },
        { id: 2, name: "Black Gloss-Visor Redgold", available: false },
        { id: 3, name: "Black Gloss-Visor Blue", available: true },
      ];

  const handleOrder = () => {
    if (!currentUser) {
      if (onShowLoginPopup) onShowLoginPopup();
      return;
    }
    setShowOrder(true);
  };

  const handleOrderSubmit = (orderData) => {
    if (typeof onCheckout === "function") {
      onCheckout(selectedItem);
    }
    setShowOrder(false);
    onNavigate("home");
    setTimeout(() => {
      const notificationButton = document.querySelector(
        'button[aria-label="notifications"]'
      );
      if (notificationButton) {
        notificationButton.click();
      }
    }, 100);
  };

  const images = selectedItem.images || [selectedItem.image];
  const currentImage = images[selectedImageIndex];
  const totalPrice = selectedItem.price * quantity;

  const handleImageDoubleClick = () => {
    if (!isService) {
      setIsFullscreen(true);
    }
  };

  const handleImageClick = () => {
    if (isService) {
      setIsFullscreen(true);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-600 mb-6">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-[oklch(0.4_0.15_140)] flex items-center gap-1"
        >
          <Home size={16} />
        </button>
        <ChevronRight size={16} className="mx-2" />
        <button
          onClick={() => onNavigate(isService ? "services" : "home")}
          className="hover:text-[oklch(0.4_0.15_140)]"
        >
          {isService ? "Services Hub" : "Marketplace"}
        </button>
        <ChevronRight size={16} className="mx-2" />
        <button
          onClick={() => onNavigate(isService ? "services" : "home")}
          className="hover:text-[oklch(0.4_0.15_140)]"
        >
          {selectedItem.category || "Produk"}
        </button>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900 font-medium">{selectedItem.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image Gallery - Left Side - Takes 3 columns */}
        <div className="lg:col-span-3">
          {/* Main Image */}
          <div
            className={`w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden mb-4 relative group ${
              !isService ? "cursor-zoom-in" : "cursor-pointer"
            }`}
            onDoubleClick={handleImageDoubleClick}
            onClick={handleImageClick}
          >
            {currentImage ? (
              <img
                src={currentImage}
                alt={selectedItem.name}
                className={`w-full h-full object-contain transition-transform duration-300 ${
                  !isService && "group-hover:scale-105"
                }`}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-full h-full flex items-center justify-center text-gray-400 text-2xl"
              style={{ display: currentImage ? "none" : "flex" }}
            >
              Gambar {selectedItem.type}
            </div>

            {/* Zoom hint for products */}
            {!isService && (
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Double click to zoom
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    idx === selectedImageIndex
                      ? "border-[oklch(0.4_0.15_140)]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedItem.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Product Description */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Deskripsi {isService ? "Jasa" : "Produk"}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {selectedItem.desc} Unily menjamin transaksi aman dan terpercaya
              untuk semua mahasiswa.
            </p>
            {isService && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  <strong>Catatan:</strong> Jasa ini akan segera diproses
                  setelah pembayaran dikonfirmasi oleh penyedia layanan.
                </p>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Ulasan ({selectedItem.rating} dari 5)
              </h3>
              <button className="text-[oklch(0.4_0.15_140)] hover:text-[oklch(0.35_0.15_140)] font-semibold text-sm">
                Lihat Semua
              </button>
            </div>

            {/* Review Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {selectedItem.rating}
                </div>
                <div className="flex items-center justify-center text-yellow-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.floor(selectedItem.rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-1">Dari 95 ulasan</p>
              </div>

              {/* Rating Distribution */}
              <div className="col-span-2 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${100 - rating * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8 text-right">
                      {95 - rating * 10}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4 border-t pt-4">
              {[1, 2].map((review) => (
                <div key={review} className="pb-4 border-b last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[oklch(0.4_0.15_140)] flex items-center justify-center text-white text-sm font-bold">
                      {review === 1 ? "I" : "R"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {review === 1 ? "Irfan Pratama" : "Rizky Ananda"}
                        </p>
                        <span className="text-xs text-gray-500">
                          2 hari lalu
                        </span>
                      </div>
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={
                              i < (review === 1 ? 5 : 4)
                                ? "currentColor"
                                : "none"
                            }
                            className="text-yellow-500"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {review === 1
                          ? "Produk bagus, packaging rapi. Cepat sampai!"
                          : "Kualitasnya lumayan, sesuai harga."}
                      </p>
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Helpful? (2)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Section - Right Side - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            {/* Product Title and Price */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedItem.name}
            </h2>
            <div className="flex items-center text-yellow-500 mb-3">
              <Star size={20} fill="currentColor" />
              <span className="ml-1 text-lg font-semibold">
                {selectedItem.rating}
              </span>
              <span className="text-gray-500 ml-2 text-sm">(95 Ulasan)</span>
            </div>
            <p className="text-3xl font-bold text-[oklch(0.4_0.15_140)] mb-6">
              Rp {selectedItem.price.toLocaleString("id-ID")}
              <span className="text-base font-normal text-gray-500">
                /{selectedItem.unit}
              </span>
            </p>

            {/* Order Form - Tokopedia Style */}
            <div className="space-y-4">
              {/* Variants for physical products */}
              {!isService && variants.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Pilih warna:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() =>
                          variant.available && setSelectedVariant(variant)
                        }
                        disabled={!variant.available}
                        className={`p-2 border-2 rounded-lg text-sm transition-all ${
                          selectedVariant?.id === variant.id
                            ? "border-[oklch(0.4_0.15_140)] bg-green-50"
                            : variant.available
                            ? "border-gray-300 hover:border-[oklch(0.4_0.15_140)]"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {variant.name}
                        {!variant.available && (
                          <span className="block text-xs text-red-500 mt-1">
                            Stok habis
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {isService ? "Jumlah" : "Atur jumlah"}:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Stok: 848 tersedia</p>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-2xl font-bold text-gray-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="p-3 border-2 border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-lg hover:bg-green-50 transition-colors">
                  <Heart size={20} />
                </button>
                <button
                  onClick={handleOrder}
                  className={`flex-1 font-bold py-3 rounded-lg text-white shadow-lg transition-colors ${
                    isService
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-[oklch(0.4_0.15_140)] hover:bg-[oklch(0.35_0.15_140)]"
                  }`}
                >
                  {isService ? "+ Pesan" : "+ Keranjang"}
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 border-2 border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Chat
                </button>
                <button className="flex-1 py-3 border-2 border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          <img
            src={currentImage}
            alt={selectedItem.name}
            className="max-w-full max-h-full object-contain"
          />
          {isService && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              Video demo placeholder
            </div>
          )}
        </div>
      )}

      {showOrder && (
        <OrderPopup
          product={{
            ...selectedItem,
            quantity,
            variant: selectedVariant,
            totalPrice,
          }}
          onClose={() => setShowOrder(false)}
          onOrder={handleOrderSubmit}
        />
      )}
    </main>
  );
};

export default ProductDetailScreen;
