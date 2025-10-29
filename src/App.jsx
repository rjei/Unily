import React, { useState, useEffect } from 'react';
import { Search, Heart, User, CheckCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import PrimaryNav from './components/PrimaryNav';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ServicesScreen from './pages/ServicesScreen';
import ProductDetailScreen from './pages/ProductDetailScreen';
import AuthScreen from './pages/AuthScreen';
import ProfileScreen from './pages/ProfileScreen';

// --- MOCK DATA --- (Akan diganti dengan API Express JS Anda)
const mockProducts = [
  { id: 5, name: 'Sepeda Polygon (Bekas)', price: 250000, unit: 'unit', location: 'Gedung Olahraga', rating: 4.3, type: 'Item', category: 'Olahraga', isRented: false, desc: "Sepeda bekas kondisi layak pakai, rutin servis. Cocok untuk mobilitas kampus." },
  { id: 1, name: 'Kamera DSLR Canon 700D', price: 100000, unit: 'hari', location: 'Fasilkom', rating: 4.8, type: 'Item', category: 'Elektronik', isRented: false, desc: "Kamera DSLR serbaguna dalam kondisi sangat baik, cocok untuk kebutuhan fotografi mahasiswa. Siap untuk disewa!" },
  { id: 2, name: 'Laptop ASUS Vivobook 14"', price: 30000, unit: 'hari', location: 'Perpus', rating: 4.5, type: 'Item', category: 'Elektronik', isRented: false, desc: "Laptop spek medium untuk tugas-tugas ringan dan presentasi." },
  { id: 3, name: 'Speaker Portable JBL Go 3', price: 15000, unit: 'hari', location: 'Sekre BEM', rating: 5.0, type: 'Item', category: 'Audio', isRented: true, desc: "Speaker compact, ideal untuk rapat atau kumpul kelompok." },
  { id: 4, name: 'Buku Kimia Dasar', price: 5000, unit: 'bulan', location: 'F. MIPA', rating: 4.2, type: 'Item', category: 'Buku', isRented: false, desc: "Buku referensi wajib Kimia Dasar, kondisi 90%." },
];

const mockServices = [
    { id: 101, name: 'Jasa Desain Poster Event', price: 50000, unit: 'proyek', location: 'Fasilkom', rating: 4.9, type: 'Service', seller: 'Studio Kretif', desc: "Desain poster event kampus, UKM, atau tugas kelompok. Cepat dan revisi 2x." },
    { id: 102, name: 'Koreksi Grammar Skripsi', price: 75000, unit: 'dokumen', location: 'FIB', rating: 4.7, type: 'Service', seller: 'Layanan Bahasa', desc: "Proofreading grammar, dikerjakan oleh mahasiswa Sastra Inggris berpengalaman." },
    { id: 103, name: 'Tutor Intensif Pemrograman Web', price: 40000, unit: 'jam', location: 'FT', rating: 5.0, type: 'Service', seller: 'Mentor IT', desc: "Bimbingan private HTML, CSS, JavaScript, dan ReactJS." },
    { id: 104, name: 'Editing Video Tugas Akhir', price: 120000, unit: 'video', location: 'F. Vokasi', rating: 4.6, type: 'Service', seller: 'Video Creative', desc: "Jasa edit video profesional untuk tugas akhir atau vlog." },
];

const affiliatedBulletin = {
    title: 'UNILY STUDY: Siap Tempur UTS/UAS?',
    subtitle: 'Dapatkan mentor terbaik dari fakultasmu. Daftar sekarang untuk les intensif!',
    cta: 'Daftar Les Intensif',
    color: 'bg-gradient-to-r from-red-500 to-orange-500',
    icon: '🧠'
};
// --- END MOCK DATA ---

// --- GLOBAL STATE & HELPER COMPONENTS ---
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const navigate = (page, item = null) => {
    setSelectedItem(item);
    setCurrentPage(page);
    window.scrollTo(0, 0); // Gulir ke atas saat navigasi
  };

  // Restore sesi user dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('unily_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (_) {
        localStorage.removeItem('unily_user');
      }
    }
  }, []);
  
  const handleSearch = (e) => {
      if (e.key === 'Enter') {
          // Implementasi API Call ke Express JS di sini (Fase UAS)
          console.log(`Mencari "${searchText}" di API Express JS...`);
          alert(`Mencari: ${searchText}. Di Fase UAS, ini akan memanggil API Backend.`);
          // Setelah API Call: navigate('search-results', results);
      }
  }
  const handleCheckout = (item) => {
    if (!item) return;
    const cartItem = {
      id: Date.now(),
      ...item,
      checkoutDate: new Date().toLocaleString('id-ID'),
      status: 'Pending'
    };
    setCart(prev => [cartItem, ...prev]);
    alert(`Item "${item.name}" berhasil ditambahkan ke keranjang!`);
  };
  const handleAuthSuccess = (user) => {
    localStorage.setItem('unily_user', JSON.stringify(user));
    setCurrentUser(user);
    navigate('profile');
  };
  const handleLogout = () => {
    localStorage.removeItem('unily_user');
    setCurrentUser(null);
    navigate('auth');
  };


  // --- RENDER UTAMA ---
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeScreen
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            onNavigate={navigate}
            services={mockServices}
            products={mockProducts}
            bulletin={affiliatedBulletin}
          />
        );
      case 'services':
        return <ServicesScreen services={mockServices} onNavigate={navigate} onCheckout={handleCheckout} />;
      case 'details':
        return <ProductDetailScreen selectedItem={selectedItem} onNavigate={navigate} onCheckout={handleCheckout} />;
      case 'auth':
        return <AuthScreen onBack={() => navigate('home')} onAuthSuccess={handleAuthSuccess} currentUser={currentUser} />;
      case 'profile':
        return <ProfileScreen user={currentUser} onNavigate={navigate} onLogout={handleLogout} />;
      default:
        return (
          <HomeScreen
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            onNavigate={navigate}
            services={mockServices}
            products={mockProducts}
            bulletin={affiliatedBulletin}
          />
        );
    }
  };

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && !event.target.closest('.cart-dropdown')) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar currentUser={currentUser} onNavigate={navigate} cart={cart} showCart={showCart} setShowCart={setShowCart} />

        {/* Navigasi Utama: disembunyikan saat halaman Auth */}
        {currentPage !== 'auth' && <PrimaryNav currentPage={currentPage} onNavigate={navigate} />}
        
        {/* Konten Halaman */}
        <div className="grow">
            {renderPage()}
        </div>
        
        <Footer />
    </div>
  );
}

export default App;
