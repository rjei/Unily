import React, { useState } from "react";
import { X } from "lucide-react";

const OrderPopup = ({ product, onClose, onOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const isService = product.type === "Service";

  const handleOrder = () => {
    if (!address) {
      setError(
        isService
          ? "Lokasi/detail proyek wajib diisi."
          : "Alamat pengiriman wajib diisi."
      );
      return;
    }
    setError("");
    onOrder({ productId: product.id, quantity, address, product });
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {isService ? "Pesan Jasa" : "Konfirmasi Pesanan"}
        </h2>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-[oklch(0.4_0.15_140)] font-bold">
            Rp {product.price.toLocaleString("id-ID")}{" "}
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            {isService ? "Jumlah Pesanan" : "Jumlah"}
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[oklch(0.4_0.15_140)] focus:border-[oklch(0.4_0.15_140)]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            {isService ? "Detail Proyek / Instruksi" : "Alamat Pengiriman"}
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={
              isService
                ? "Jelaskan detail proyek atau instruksi khusus..."
                : "Masukkan alamat pengiriman lengkap"
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[oklch(0.4_0.15_140)] focus:border-[oklch(0.4_0.15_140)] h-24 resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-between items-center mb-4 pt-4 border-t">
          <span className="text-lg font-semibold text-gray-700">Total:</span>
          <span className="text-2xl font-bold text-[oklch(0.4_0.15_140)]">
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleOrder}
            className={`flex-1 py-3 ${
              isService
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-[oklch(0.4_0.15_140)] hover:bg-[oklch(0.35_0.15_140)]"
            } text-white rounded-lg font-semibold transition-colors shadow-lg`}
          >
            {isService ? "Pesan Sekarang" : "Konfirmasi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
