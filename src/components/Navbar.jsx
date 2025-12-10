import React, { useState, useEffect, useRef } from "react";
// 1. IMPORT Link & useNavigate DARI ROUTER
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, MessageCircle, Heart } from "lucide-react";
import SearchDropdown from "./navbar/SearchDropdown";
import ProfileDropdown from "./navbar/ProfileDropdown";
import NotificationDropdown from "./navbar/NotificationDropdown";
import MessagesDropdown from "./navbar/MessagesDropdown";

const Navbar = ({
  currentUser,
  cart,
  showCart,
  setShowCart,
  searchText,
  setSearchText,
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
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const messagesRef = useRef(null);

  // 2. INITIALIZE HOOK NAVIGATE
  const navigate = useNavigate();

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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !profileRef.current?.contains(event.target) &&
        !cartRef.current?.contains(event.target) &&
        !messagesRef.current?.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessagesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowCart]);

  useEffect(() => {
    // Defensive check untuk searchText
    if ((searchText || "").trim().length > 0) {
      setSearchLoading(true);
      setShowSearchDropdown(true);

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
            (item.name || "").toLowerCase().includes(query) ||
            (item.desc || "").toLowerCase().includes(query)
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
  }, [searchText, allProducts, allServices]);

  // 3. FIX FUNGSI SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    // Gunakan searchText (state), bukan searchQuery
    const term = (searchText || "").trim();

    if (term) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
      setShowSearchDropdown(false);
      setSearchText("");
    }
  };

  const handleSelectItem = (item, type) => {
    setShowSearchDropdown(false);
    setSearchText("");
    if (type === "product") {
      navigate(`/marketplace/detail/${item.id}`);
    } else if (type === "store") {
      navigate(`/search?store=${encodeURIComponent(item.name)}`);
    }
  };

  const handleViewAll = () => {
    setShowSearchDropdown(false);
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <nav className="bg-white px-4 md:px-16 py-3 border-b border-gray-100 fixed w-full top-0 z-40 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* LOGO - Ganti button jadi Link */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity shrink-0"
        >
          <img
            src="/logo.png"
            alt="Unily"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold text-gray-900">Unily</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative" role="search">
            <label htmlFor="global-search" className="sr-only">
              Cari produk, toko, atau jasa
            </label>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
              aria-hidden="true"
            />
            <input
              id="global-search"
              type="search"
              placeholder="Cari produk, toko, atau jasa..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              onFocus={() =>
                (searchText || "").trim() && setShowSearchDropdown(true)
              }
              aria-label="Cari produk, toko, atau jasa"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-expanded={showSearchDropdown}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-gray-300 transition-all placeholder:text-gray-400"
            />
          </form>

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

        {/* Right Icons */}
        <div className="flex items-center space-x-2">
          {/* Wishlist */}
          {currentUser && (
            <Link
              to="/wishlist"
              className="p-2.5 hover:bg-red-50 rounded-xl transition-colors relative focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-gray-600 hover:text-red-500" />
            </Link>
          )}

          {/* Cart/Notifications */}
          <div
            className="relative"
            ref={cartRef}
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
          >
            <button
              aria-label={`Notifikasi${
                (cart || []).length > 0
                  ? `, ${(cart || []).length} notifikasi baru`
                  : ""
              }`}
              aria-haspopup="true"
              aria-expanded={showCart}
              className="p-2.5 hover:bg-orange-100 rounded-xl transition-colors relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <Bell
                size={20}
                className="cursor-pointer text-gray-600 hover:text-orange-600"
                aria-hidden="true"
              />
              {/* Defensive check cart.length */}
              {(cart || []).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {(cart || []).length}
                </span>
              )}
            </button>
            {showCart && (
              <NotificationDropdown
                cart={cart}
                currentUser={currentUser}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onNavigate={(path) =>
                  navigate(path === "home" ? "/" : `/${path}`)
                }
                setShowCart={setShowCart}
              />
            )}
          </div>

          {/* Messages - Only show if logged in */}
          {currentUser && (
            <div
              className="relative"
              ref={messagesRef}
              onMouseEnter={() => setShowMessagesDropdown(true)}
              onMouseLeave={() => setShowMessagesDropdown(false)}
            >
              <button
                aria-label="Pesan, 1 pesan baru"
                aria-haspopup="true"
                aria-expanded={showMessagesDropdown}
                className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors relative focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <MessageCircle
                  size={20}
                  className="cursor-pointer text-gray-600"
                  aria-hidden="true"
                />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  1
                </span>
              </button>
              {showMessagesDropdown && (
                <MessagesDropdown
                  onClose={() => setShowMessagesDropdown(false)}
                />
              )}
            </div>
          )}

          {/* User Profile / Login */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/users")}
                  className="bg-purple-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Daftar Users
                </button>
              )}
              <div
                className="relative"
                ref={profileRef}
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <button
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onClick={() => navigate("/profile/settings")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-base font-bold ${
                      currentPage === "services"
                        ? "bg-orange-500"
                        : "bg-[oklch(0.4_0.15_140)]"
                    }`}
                  >
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                </button>
                {showProfileDropdown && (
                  <ProfileDropdown
                    currentUser={currentUser}
                    onNavigate={(path) =>
                      navigate(path === "home" ? "/" : `/${path}`)
                    }
                    onClose={() => setShowProfileDropdown(false)}
                    onLogout={onLogout}
                    currentPage={currentPage}
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={() => navigate("/signup")}
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
