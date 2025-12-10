import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import PrimaryNav from "../PrimaryNav";

const MainLayout = () => {
  // ... (States dan Hooks tidak berubah)
  const [showCart, setShowCart] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("unily_user");
    if (user) setCurrentUser(JSON.parse(user));

    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("unily_token");
    localStorage.removeItem("unily_user");
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
           {/* 1. Navbar Putih (Raja, di atas) */}     {" "}
      <Navbar
        currentUser={currentUser}
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        searchText={searchText}
        setSearchText={setSearchText}
        onLogout={handleLogout}
        allProducts={[]}
        allServices={[]}
        currentPage={pathname.split("/")[1] || "home"}
      />
      {/* 2. Primary Nav Hijau/Oren (Hanya satu, di bawah Navbar) */}
      <PrimaryNav currentUser={currentUser} />
      {/* ✅ KONTEN HALAMAN (pt-36 agar ada ruang bernafas di bawah dua navbar) */}
      <main className="grow pt-36" role="main">
        <Outlet />
      </main>
      <Footer />{" "}
    </div>
  );
};

export default MainLayout;
