import React from "react";
import {
  ShoppingBag,
  Heart,
  Store,
  Settings,
  Wallet,
  CreditCard,
  LogOut,
} from "lucide-react";

const ProfileDropdown = ({
  currentUser,
  onNavigate,
  onClose,
  onLogout,
  currentPage,
}) => {
  // Dynamic color based on current page
  const iconColor =
    currentPage === "services" ? "bg-orange-500" : "bg-[oklch(0.4_0.15_140)]";

  return (
    <>
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        style={{ top: "77px" }}
        onClick={onClose}
      />

      {/* Dropdown content - Compact 2-column layout with onMouseLeave */}
      <div
        className="absolute right-0 top-12 w-[420px] bg-white border border-gray-200 rounded-xl shadow-2xl z-50"
        onMouseLeave={onClose}
      >
        {/* Header - User Info with Avatar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${iconColor} flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={() => {
              onNavigate("profile/settings");
              onClose();
            }}
          >
            <span className="text-white text-lg font-bold">
              {currentUser?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {currentUser?.name || "User"}
            </h4>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {/* Left Column - Services */}
          <div className="space-y-2">
            {/* GoPay */}
            <button className="w-full flex items-center justify-between p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-gray-700">GoPay</span>
              </div>
              <span className="cursor-pointer text-xs text-blue-600 font-semibold">
                Aktifkan
              </span>
            </button>

            {/* Unily Card */}
            <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="flex items-center gap-2">
                <CreditCard size={14} className="text-gray-600" />
                <span className="text-xs font-medium text-gray-700">
                  Unily Card
                </span>
              </div>
              <span className="cursor-pointer text-xs text-[oklch(0.4_0.15_140)] font-semibold">
                Daftar
              </span>
            </button>

            {/* Saldo */}
            <button className="w-full flex items-center justify-between p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-green-600" />
                <span className="text-xs font-medium text-gray-700">Saldo</span>
              </div>
              <span className="text-xs text-gray-900 font-semibold">Rp0</span>
            </button>

            {/* Unily Seru */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Unily Seru
              </p>
              <div className="space-y-1">
                <button className="w-full flex items-center justify-between text-xs py-1 hover:text-[oklch(0.4_0.15_140)]">
                  <span className="text-gray-600">Misi Seru</span>
                  <span className="text-gray-400">0</span>
                </button>
                <button className="w-full flex items-center justify-between text-xs py-1 hover:text-[oklch(0.4_0.15_140)]">
                  <span className="text-gray-600">Kupon Saya</span>
                  <span className="cursor-pointer text-[oklch(0.4_0.15_140)] font-semibold">
                    Cek
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Menu Items */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate("orders");
                onClose();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <ShoppingBag size={14} className="text-gray-600" />
              <span className="cursor-pointer text-xs text-gray-700">
                Pembelian
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate("wishlist");
                onClose();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Heart size={14} className="text-gray-600" />
              <span className="cursor-pointer text-xs text-gray-700">
                Wishlist
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate("favorite-stores");
                onClose();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Store size={14} className="text-gray-600" />
              <span className="cursor-pointer text-xs text-gray-700">
                Toko Favorit
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate("/profile/settings");
                onClose();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Settings size={14} className="text-gray-600" />
              <span className="cursor-pointer text-xs text-gray-700">
                Pengaturan
              </span>
            </button>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 transition-colors text-left"
            >
              <LogOut size={14} className="text-red-500" />
              <span className="cursor-pointer text-xs text-red-500">
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
