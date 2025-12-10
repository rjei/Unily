import React from "react";
import { Settings, Package, Bell } from "lucide-react";

const NotificationDropdown = ({
  activeTab,
  setActiveTab,
  cart,
  onNavigate,
  currentUser,
  setShowCart,
}) => {
  return (
    <div className="absolute right-0 top-12 w-96 bg-white border border-gray-100 rounded-xl shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-base">Notifikasi</h3>
        <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings size={18} />
        </button>
      </div>

      {/* Tab Transaksi dan Update */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("transaksi")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            activeTab === "transaksi"
              ? "text-[oklch(0.4_0.15_140)] border-b-2 border-[oklch(0.4_0.15_140)]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Transaksi
        </button>
        <button
          onClick={() => setActiveTab("update")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "update"
              ? "text-[oklch(0.4_0.15_140)] border-b-2 border-[oklch(0.4_0.15_140)]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Update
        </button>
      </div>

      {/* Konten Tab */}
      <div className="max-h-[500px] overflow-y-auto">
        {activeTab === "transaksi" ? (
          <div>
            {/* Pembelian Section */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">Pembelian</h4>
                <a
                  href="#"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Lihat Semua
                </a>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                  Menunggu Pembayaran
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Menunggu Pembayaran
                  </p>

                  {cart.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        Order Terbaru:
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={cart[0].image}
                          alt={cart[0].name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {cart[0].name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Rp {cart[0].price?.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Tanggal:</span>{" "}
                          {cart[0].checkoutDate}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span className="text-orange-600 font-semibold">
                            {cart[0].status}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Seller Section */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-2">
                Unily Seller Centre
              </h4>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Cek pesanan yang masuk dan perkembangan tokomu secara rutin di
                satu tempat
              </p>
              <button
                onClick={() => {
                  const isSeller = currentUser?.isSeller || false;
                  if (isSeller) {
                    onNavigate("seller");
                  } else {
                    onNavigate("daftar_seller");
                  }
                  setShowCart(false);
                }}
                className="w-full py-2.5 px-4 border border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-lg font-medium hover:bg-[oklch(0.4_0.15_140)]/5 transition-colors text-sm"
              >
                Masuk ke Unily Seller
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-center py-8 text-gray-400">
              <div className="text-center">
                <Bell size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Belum ada update</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
