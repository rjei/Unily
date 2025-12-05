import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, User, CheckCircle } from "lucide-react";
import Navbar from "./components/Navbar";
import PrimaryNav from "./components/PrimaryNav";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import BulletinPopup from "./components/BulletinPopup";
import LoginPopup from "./components/LoginPopup";
import HomeScreen from "./pages/HomeScreen";
import ServicesScreen from "./pages/ServicesScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import SearchResultsScreen from "./pages/SearchResultsScreen";
import AuthScreen from "./pages/AuthScreen";
import ProfileScreen from "./pages/ProfileScreen";
import Seller from "./pages/seller";
import DaftarSeller from "./pages/daftar_seller";
import NotFound from "./pages/NotFound";

const mockProducts = [
  {
    id: 5,
    name: "Sepeda Polygon (Bekas)",
    price: 250000,
    unit: "unit",
    location: "Gedung Olahraga",
    rating: 4.3,
    type: "Item",
    category: "Olahraga",
    isRented: false,
    desc: "Sepeda bekas kondisi layak pakai, rutin servis. Cocok untuk mobilitas kampus.",
    image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800",
    images: [
      "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
    ],
  },
  {
    id: 1,
    name: "Kamera DSLR Canon 700D",
    price: 100000,
    unit: "hari",
    location: "Fasilkom",
    rating: 4.8,
    type: "Item",
    category: "Elektronik",
    isRented: false,
    desc: "Kamera DSLR serbaguna dalam kondisi sangat baik, cocok untuk kebutuhan fotografi mahasiswa. Siap untuk disewa!",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800",
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=800",
      "https://images.unsplash.com/photo-1588846570983-c6f3bd489f6f?w=800",
    ],
  },
  {
    id: 2,
    name: 'Laptop ASUS Vivobook 14"',
    price: 30000,
    unit: "hari",
    location: "Perpus",
    rating: 4.5,
    type: "Item",
    category: "Elektronik",
    isRented: false,
    desc: "Laptop spek medium untuk tugas-tugas ringan dan presentasi.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800",
    ],
  },
  {
    id: 3,
    name: "Speaker Portable JBL Go 3",
    price: 15000,
    unit: "hari",
    location: "Sekre BEM",
    rating: 5.0,
    type: "Item",
    category: "Audio",
    isRented: true,
    desc: "Speaker compact, ideal untuk rapat atau kumpul kelompok.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    ],
  },
  {
    id: 4,
    name: "Buku Kimia Dasar",
    price: 5000,
    unit: "bulan",
    location: "F. MIPA",
    rating: 4.2,
    type: "Item",
    category: "Buku",
    isRented: false,
    desc: "Buku referensi wajib Kimia Dasar, kondisi 90%.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    ],
  },
];

const mockServices = [
  {
    id: 101,
    name: "Jasa Desain Poster Event",
    price: 50000,
    unit: "proyek",
    location: "Fasilkom",
    rating: 4.9,
    type: "Service",
    seller: "Studio Kretif",
    desc: "Desain poster event kampus, UKM, atau tugas kelompok. Cepat dan revisi 2x.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800",
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800",
    ],
  },
  {
    id: 102,
    name: "Koreksi Grammar Skripsi",
    price: 75000,
    unit: "dokumen",
    location: "FIB",
    rating: 4.7,
    type: "Service",
    seller: "Layanan Bahasa",
    desc: "Proofreading grammar, dikerjakan oleh mahasiswa Sastra Inggris berpengalaman.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800",
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    ],
  },
  {
    id: 103,
    name: "Tutor Intensif Pemrograman Web",
    price: 40000,
    unit: "jam",
    location: "FT",
    rating: 5.0,
    type: "Service",
    seller: "Mentor IT",
    desc: "Bimbingan private HTML, CSS, JavaScript, dan ReactJS.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    ],
  },
  {
    id: 104,
    name: "Editing Video Tugas Akhir",
    price: 120000,
    unit: "video",
    location: "F. Vokasi",
    rating: 4.6,
    type: "Service",
    seller: "Video Creative",
    desc: "Jasa edit video profesional untuk tugas akhir atau vlog.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800",
    images: [
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800",
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800",
      "https://images.unsplash.com/photo-1579047440656-e5c0f2900ca4?w=800",
    ],
  },
];

const affiliatedBulletin = {
  title: "UNILY STUDY: Siap Tempur UTS/UAS?",
  subtitle:
    "Dapatkan mentor terbaik dari fakultasmu. Daftar sekarang untuk les intensif!",
  cta: "Daftar Les Intensif",
  color: "bg-gradient-to-r from-red-500 to-orange-500",
  icon: "🧠",
};

function App() {
  const navigateRouter = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showBulletinPopup, setShowBulletinPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const currentPage = location.pathname.substring(1) || "home";

  const navigate = (page, item = null) => {
    if (page === "login" || page === "signup" || page === "daftar_seller") {
      setIsLoading(true);
    }
    setSelectedItem(item);

    setTimeout(
      () => {
        navigateRouter(`/${page}`);
        window.scrollTo(0, 0);
        setIsLoading(false);
      },
      page === "login" || page === "signup" || page === "daftar_seller"
        ? 800
        : 0
    );
  };

  const setIsSellerStatus = (isSellerStatus) => {
    setCurrentUser(prevUser => {
        if (prevUser) {
            const updatedUser = { ...prevUser, isSeller: isSellerStatus };
            localStorage.setItem("unily_user", JSON.stringify(updatedUser));
            return updatedUser;
        }
        return prevUser;
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('unily_token');
      if (!token) {
        setCurrentPage('auth');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem('unily_token');
          localStorage.removeItem('unily_user');
          setCurrentUser(null);
          setCurrentPage('auth');
          return;
        }
        const body = await res.json();
        if (body && body.user) {
          localStorage.setItem('unily_user', JSON.stringify(body.user));
          setCurrentUser(body.user);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    if (currentPage === 'profile') {
      fetchProfile();
    }
  }, [currentPage]);

  useEffect(() => {
    const saved = localStorage.getItem("unily_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (_) {
        localStorage.removeItem("unily_user");
      }
    }

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    const lastPopupType = localStorage.getItem("last_popup_type");
    const lastPopupTime = localStorage.getItem("last_popup_time");

    if (!lastPopupTime || now - parseInt(lastPopupTime) > oneHour) {
      setTimeout(() => {
        if (!saved && lastPopupType !== "login") {
          setShowLoginPopup(true);
          localStorage.setItem("last_popup_type", "login");
          localStorage.setItem("last_popup_time", now.toString());
        }
        else if (saved || lastPopupType === "login") {
          setShowBulletinPopup(true);
          localStorage.setItem("last_popup_type", "bulletin");
          localStorage.setItem("last_popup_time", now.toString());
        }
        else {
          setShowBulletinPopup(true);
          localStorage.setItem("last_popup_type", "bulletin");
          localStorage.setItem("last_popup_time", now.toString());
        }
      }, 2000);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (!currentUser && window.scrollY > 1000 && !showLoginPopup) {
        const hasShownScrollPopup = sessionStorage.getItem(
          "shown_scroll_login_popup"
        );
        if (!hasShownScrollPopup) {
          setShowLoginPopup(true);
          sessionStorage.setItem("shown_scroll_login_popup", "true");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentUser, showLoginPopup]);

  const handleSearch = (e, searchValue = searchText) => {
    if ((e && e.key === "Enter") || !e) {
      const query = searchValue.toLowerCase().trim();
      if (!query) return;

      setSearchText(query);
      navigate("search-results");
    }
  };

  const handleCheckout = (item) => {
    if (!item) return;
    const cartItem = {
      id: Date.now(),
      ...item,
      checkoutDate: new Date().toLocaleString("id-ID"),
      status: "Pending",
    };
    setCart((prev) => [cartItem, ...prev]);
    alert(`Item "${item.name}" berhasil ditambahkan ke keranjang!`);
  };

  const handleAuthSuccess = (user) => {
    localStorage.setItem("unily_user", JSON.stringify(user));
    setCurrentUser(user);
    setShowLoginPopup(false);

    localStorage.setItem("last_popup_type", "login");
    localStorage.setItem("last_popup_time", Date.now().toString());

    navigateRouter("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("unily_user");
    setCurrentUser(null);
    navigateRouter("/login");
  };

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/daftar_seller";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && !event.target.closest(".cart-dropdown")) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideNavbar && currentPage !== "seller" && (
        <Navbar
          currentUser={currentUser}
          onNavigate={navigate}
          cart={cart}
          showCart={showCart}
          setShowCart={setShowCart}
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
          allProducts={mockProducts}
          allServices={mockServices}
        />
      )}

      {!hideNavbar && currentPage !== "seller" && (
        <PrimaryNav currentPage={currentPage} onNavigate={navigate} currentUser={currentUser} />
      )}

      <div className="grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearch={handleSearch}
                onNavigate={navigate}
                services={mockServices}
                products={mockProducts}
                bulletin={affiliatedBulletin}
              />
            }
          />
          <Route
            path="/home"
            element={
              <HomeScreen
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearch={handleSearch}
                onNavigate={navigate}
                services={mockServices}
                products={mockProducts}
                bulletin={affiliatedBulletin}
              />
            }
          />
          <Route
            path="/services"
            element={
              <ServicesScreen
                services={mockServices}
                onNavigate={navigate}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route
            path="/search-results"
            element={
              <SearchResultsScreen
                searchQuery={searchText}
                onNavigate={navigate}
                products={mockProducts}
                services={mockServices}
              />
            }
          />
          <Route
            path="/details"
            element={
              <ProductDetailScreen
                selectedItem={selectedItem}
                onNavigate={navigate}
                onCheckout={handleCheckout}
                currentUser={currentUser}
                onShowLoginPopup={() => setShowLoginPopup(true)}
              />
            }
          />
          <Route
            path="/login"
            element={
              <AuthScreen
                mode="login"
                onBack={() => navigate("home")}
                onAuthSuccess={handleAuthSuccess}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <AuthScreen
                mode="signup"
                onBack={() => navigate("home")}
                onAuthSuccess={handleAuthSuccess}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileScreen
                user={currentUser}
                onNavigate={navigate}
                onLogout={handleLogout}
              />
            }
          />
          <Route path="/seller" element={<Seller onNavigate={navigate} currentUser={currentUser} />} />
          <Route
            path="/daftar_seller"
            element={<DaftarSeller onNavigate={navigate} onSetSeller={setIsSellerStatus} />}
          />
          <Route path="*" element={<NotFound onNavigate={navigate} />} />
        </Routes>
      </div>

      {!hideNavbar && currentPage !== "seller" && <Footer />}

      {showBulletinPopup && (
        <BulletinPopup onClose={() => setShowBulletinPopup(false)} />
      )}
      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}

export default App;