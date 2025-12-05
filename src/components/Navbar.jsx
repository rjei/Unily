import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  User,
  Clock,
  Package,
  Truck,
  MapPin,
  Settings,
} from "lucide-react";
import SearchDropdown from "./SearchDropdown";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({
  currentUser,
  onNavigate,
  cart,
  showCart,
  setShowCart,
  searchText,
  setSearchText,
  onSearch,
  allProducts,
  allServices,
  onLogout,
  currentPage,
}) => {
  const [activeTab, setActiveTab] = useState("transaksi");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Mock stores data
  const mockStores = [
    {
      id: "s1",
      name: "Toko Buku Gramedia USU",
      type: "official",
      location: "USU - Medan",
    },
    {
      id: "s2",
      name: "Indomaret USU",
      type: "official",
      location: "USU - Medan",
    },
    {
      id: "s3",
      name: "Koperasi Mahasiswa USU",
      type: "official",
      location: "USU - Medan",
    },
    {
      id: "s4",
      name: "Store Ahmad Rizky",
      type: "student",
      location: "Fasilkom - USU",
    },
    {
      id: "s5",
      name: "Toko Elektronik Budi",
      type: "student",
      location: "Teknik - USU",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      setSearchLoading(true);
      setShowSearchDropdown(true);

      // Simulate search delay
      const timer = setTimeout(() => {
        const query = searchText.toLowerCase();
        const filteredStores = mockStores.filter((store) =>
          store.name.toLowerCase().includes(query)
        );
        const filteredProducts = [
          ...(allProducts || []),
          ...(allServices || []),
        ].filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.desc?.toLowerCase().includes(query)
        );

        setSearchResults({
          stores: filteredStores,
          products: filteredProducts,
          total: filteredStores.length + filteredProducts.length,
        });
        setSearchLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowSearchDropdown(false);
      setSearchResults(null);
    }
  }, [searchText]);

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      setShowSearchDropdown(false);
      onSearch(e, searchText);
    }
  };

  const handleSelectItem = (item, type) => {
    setShowSearchDropdown(false);
    setSearchText("");
    if (type === "product") {
      onNavigate("details", item);
    } else if (type === "store") {
      // Navigate to store page
      onNavigate("search-results", null, item.name);
    }
  };

  const handleViewAll = () => {
    setShowSearchDropdown(false);
    onSearch(null, searchText);
  };

  return (
    <nav className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Unily"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold text-gray-900">Unily</span>
        </button>

        {/* Search Bar with Dropdown */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari produk, toko, atau jasa..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              onFocus={() => searchText.trim() && setShowSearchDropdown(true)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-gray-300 focus:shadow-sm transition-all placeholder:text-gray-400"
            />
          </div>
          {showSearchDropdown && (
            <SearchDropdown
              isLoading={searchLoading}
              results={searchResults}
              onSelectItem={handleSelectItem}
              onViewAll={handleViewAll}
              currentPage={currentPage}
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative cart-dropdown">
            <button
              onClick={() => setShowCart(!showCart)}
              className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors relative"
              aria-label="notifications"
            >
              <Bell size={20} className="text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cart.length}
                </span>
              )}
            </button>
            {showCart && (
              <div className="absolute right-0 top-12 w-96 bg-white border border-gray-100 rounded-xl shadow-2xl z-50">
                {/* Header dengan Tab dan Settings */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base">
                    Notifikasi
                  </h3>
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
                          <h4 className="font-semibold text-gray-800">
                            Pembelian
                          </h4>
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
                            
                            {/* Display Latest Order */}
                            {cart.length > 0 && (
                              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs font-semibold text-gray-700 mb-2">Order Terbaru:</p>
                                <div className="flex items-center gap-2 mb-2">
                                  <img 
                                    src={cart[0].image} 
                                    alt={cart[0].name}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-900 truncate">{cart[0].name}</p>
                                    <p className="text-xs text-gray-600">Rp {cart[0].price?.toLocaleString('id-ID')}</p>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-600 space-y-1">
                                  <p><span className="font-medium">Tanggal:</span> {cart[0].checkoutDate}</p>
                                  <p><span className="font-medium">Status:</span> <span className="text-orange-600 font-semibold">{cart[0].status}</span></p>
                                </div>
                              </div>
                            )}
                            
                            {/* Status Icons */}
                            <div className="grid grid-cols-4 gap-2 mb-4">
                              <button className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                                  <Clock size={20} className="text-gray-600" />
                                </div>
                                <span className="text-xs text-gray-700 text-center">
                                  Menunggu Konfirmasi
                                </span>
                              </button>
                              <button className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                                  <Package
                                    size={20}
                                    className="text-gray-600"
                                  />
                                </div>
                                <span className="text-xs text-gray-700 text-center">
                                  Pesanan Diproses
                                </span>
                              </button>
                              <button className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                                  <Truck size={20} className="text-gray-600" />
                                </div>
                                <span className="text-xs text-gray-700 text-center">
                                  Sedang Dikirim
                                </span>
                              </button>
                              <button className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                                  <MapPin size={20} className="text-gray-600" />
                                </div>
                                <span className="text-xs text-gray-700 text-center">
                                  Sampai Tujuan
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Penjualan Section */}
                      <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                          Penjualan
                        </h4>
                        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                          Cek pesanan yang masuk dan perkembangan tokomu secara
                          rutin di satu tempat
                        </p>
                        <button
                          onClick={() => {
                            // Check if user is registered as seller
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

                      {/* Untuk Kamu Section */}
                      <div className="p-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Untuk Kamu
                        </h4>
                        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                          <Package size={48} className="mb-2 opacity-50" />
                          <p className="text-sm">empty</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <a
                            href="#"
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                          >
                            Tandai semua dibaca
                          </a>
                          <a
                            href="#"
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                          >
                            Lihat selengkapnya
                          </a>
                        </div>
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
            )}
          </div>
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onMouseEnter={() => setShowProfileDropdown(true)}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    currentPage === "services"
                      ? "bg-linear-to-br from-orange-400 to-orange-600"
                      : "bg-linear-to-br from-green-400 to-green-600"
                  }`}
                >
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden group-hover:block text-left">
                  <p className="text-xs font-semibold text-gray-900">
                    {currentUser?.name || "John"}
                  </p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </button>
              {showProfileDropdown && (
                <ProfileDropdown
                  currentUser={currentUser}
                  onNavigate={onNavigate}
                  onClose={() => setShowProfileDropdown(false)}
                  onLogout={onLogout}
                  currentPage={currentPage}
                />
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => onNavigate("login")}
                className="text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="bg-[oklch(0.4_0.15_140)] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[oklch(0.35_0.15_140)] transition-colors"
              >
                Daftar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
