// 1. DATA MARKETPLACE
export const products = [
  // Produk Farmasi
  {
    id: "mp_1",
    name: "Jas Lab Lengan Panjang Farmasi",
    price: 85000,
    originalPrice: 120000,
    image:
      "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 156,
    category: "Fashion",
    seller: "Toko Alat Farmasi USU",
    sellerId: 1,
    sellerDetail: {
      name: "Toko Alat Farmasi USU",
      verified: true,
      badge: "Resmi",
    },
    type: "jual",
    rentalType: "jual",
    condition: "baru",
    stock: 45,
    description: "Jas lab putih standar farmasi dengan logo universitas.",
  },
  {
    id: "mp_2",
    name: "Set Alat Laboratorium Farmasi (Gelas Ukur, Pipet)",
    price: 150000,
    originalPrice: 200000,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 89,
    category: "Alat Tulis",
    seller: "Lab Equipment Store",
    sellerId: 2,
    sellerDetail: {
      name: "Lab Equipment Store",
      verified: true,
      badge: "Resmi",
    },
    type: "jual",
    rentalType: "jual",
    condition: "baru",
    stock: 20,
    description: "Set lengkap alat lab untuk praktikum farmasi semester awal.",
  },
  {
    id: "mp_3",
    name: "Buku Farmakologi Katzung Edisi 13 (Bekas)",
    price: 280000,
    originalPrice: 500000,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 67,
    category: "Buku",
    seller: "Budi Farmasi 2021",
    sellerId: 3,
    sellerDetail: { name: "Budi Farmasi 2021", verified: false, badge: null },
    type: "jual",
    rentalType: "jual",
    condition: "bekas",
    stock: 1,
    description: "Kondisi baik, masih ada highlight. Cocok untuk semester 5-6.",
  },
  {
    id: "mp_4",
    name: "Kalkulator Scientific Casio FX-991ES PLUS",
    price: 250000,
    originalPrice: 320000,
    image:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 234,
    category: "Elektronik",
    seller: "Toko Elektronik Kampus",
    sellerId: 4,
    sellerDetail: {
      name: "Toko Elektronik Kampus",
      verified: true,
      badge: "Resmi",
    },
    type: "jual",
    rentalType: "jual",
    condition: "baru",
    stock: 15,
    description: "Kalkulator wajib untuk hitung dosis obat dan kimia analitik.",
  },

  // Sewa Kamera
  {
    id: "mp_5",
    name: "Sewa Kamera Canon EOS M50 Mark II + Lensa",
    price: 75000,
    originalPrice: 100000,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 178,
    category: "Elektronik",
    seller: "Rental Kamera Mahasiswa",
    sellerId: 5,
    sellerDetail: {
      name: "Rental Kamera Mahasiswa",
      verified: true,
      badge: "Resmi",
    },
    type: "sewa",
    rentalType: "sewa",
    condition: "baru",
    stock: 3,
    unit: "hari",
    description:
      "Sewa harian kamera mirrorless untuk dokumentasi event kampus. Include charger & memory card 32GB.",
  },
  {
    id: "mp_6",
    name: "Sewa Kamera Sony A6000 + Tripod",
    price: 60000,
    originalPrice: 80000,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a0fa8ac292?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 145,
    category: "Elektronik",
    seller: "Camera Rental USU",
    sellerId: 6,
    sellerDetail: {
      name: "Camera Rental USU",
      verified: false,
      badge: null,
    },
    type: "sewa",
    rentalType: "sewa",
    condition: "bekas_baik",
    stock: 2,
    unit: "hari",
    description:
      "Paket hemat kamera + tripod untuk tugas videografi. Deposit Rp 500.000.",
  },

  // Produk Umum Mahasiswa
  {
    id: "mp_7",
    name: "Laptop Lenovo ThinkPad T450 (Bekas)",
    price: 2500000,
    originalPrice: 3000000,
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 89,
    category: "Elektronik",
    seller: "Laptop Bekas Berkualitas",
    sellerId: 7,
    sellerDetail: {
      name: "Laptop Bekas Berkualitas",
      verified: false,
      badge: null,
    },
    type: "jual",
    rentalType: "jual",
    condition: "bekas",
    stock: 2,
    description: "Intel i5, 8GB RAM, SSD 256GB. Cocok untuk kuliah dan coding.",
  },
  {
    id: "mp_8",
    name: "Printer Canon Pixma G2010 (Print, Scan, Copy)",
    price: 1800000,
    originalPrice: 2100000,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 234,
    category: "Elektronik",
    seller: "Print Solution Kampus",
    sellerId: 8,
    sellerDetail: {
      name: "Print Solution Kampus",
      verified: true,
      badge: "Resmi",
    },
    type: "jual",
    rentalType: "jual",
    condition: "baru",
    stock: 8,
    description: "Printer tinta tank ekonomis untuk print tugas dan skripsi.",
  },
  {
    id: "mp_9",
    name: "Sepeda Lipat Polygon Urbano 3.0",
    price: 1200000,
    originalPrice: 1500000,
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 67,
    category: "Olahraga",
    seller: "Second Bike Medan",
    sellerId: 9,
    sellerDetail: { name: "Second Bike Medan", verified: false, badge: null },
    type: "jual",
    rentalType: "jual",
    condition: "bekas_baik",
    stock: 1,
    description:
      "Sepeda bekas pakai 6 bulan, kondisi mulus. Cocok untuk transportasi kampus.",
  },
  {
    id: "mp_10",
    name: "Pinjam Buku Farmasi Dasar (2 Minggu)",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 45,
    category: "Buku",
    seller: "Perpustakaan Mahasiswa",
    sellerId: 10,
    sellerDetail: {
      name: "Perpustakaan Mahasiswa",
      verified: true,
      badge: "Resmi",
    },
    type: "pinjam",
    rentalType: "pinjam",
    condition: "bekas",
    stock: 5,
    unit: "2 minggu",
    description:
      "Pinjam buku farmasi untuk periode 2 minggu. Deposit Rp 50.000.",
  },
];

// 2. DATA SERVICES
export const services = [
  {
    id: "svc_1",
    name: "Jasa Desain Grafis (Poster/Logo)",
    price: 150000,
    unit: "proyek", // Pastikan key ini ada 'unit'
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 487,
    category: "Desain",
    sellerId: 3,
    seller: "Studio Kreatif",
    sellerDetail: { name: "Studio Kreatif", verified: true, badge: "Resmi" },
    type: "Service",
    description: "Desain grafis profesional untuk branding bisnis.",
  },
  {
    id: "svc_2",
    name: "Tutor Private Pemrograman Web",
    price: 100000,
    unit: "jam",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 312,
    category: "Pendidikan",
    seller: "Code Mentor Academy",
    sellerDetail: {
      name: "Code Mentor Academy",
      verified: true,
      badge: "Resmi",
    },
    type: "Service",
    description: "Belajar HTML, CSS, JS, React dari mentor berpengalaman.",
  },
  {
    id: "svc_3",
    name: "Jasa Translate Dokumen Inggris-Indo",
    price: 45000,
    unit: "halaman",
    image:
      "https://images.unsplash.com/photo-1455849318169-8c8e6a50147f?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 89,
    category: "Bahasa",
    seller: "Professional Translator",
    sellerDetail: {
      name: "Professional Translator",
      verified: true,
      badge: "Resmi",
    },
    type: "Service",
    description: "Penerjemahan jurnal atau abstrak skripsi.",
  },
];

// 3. DATA SELLER PROFILES
export const sellerProfiles = [
  {
    id: "seller_official",
    name: "Unily Official Store",
    verified: true,
    badge: "Resmi",
    rating: 4.9,
    followers: 5230,
    products: 156,
    joinDate: "2022-01-15",
    description: "Toko resmi Unily.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop",
  },
];

// ==========================================================
// 🔥 BAGIAN PENTING (SOLUSI WHITE SCREEN) 🔥
// Kita buat ALIAS agar file lain yang manggil nama lama tidak error
// ==========================================================
export const mockServicesData = services;
export const mockProductsData = products;
export const mockSellerProfiles = sellerProfiles;

export default {
  products,
  services,
  sellerProfiles,
};
