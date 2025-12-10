# Unily - Changelog Fitur Marketplace

## 🎨 Update Terbaru - Marketplace dengan Filter Sidebar

### ✅ Fitur yang Sudah Diimplementasikan

#### 1. **MarketplaceScreen - Tampilan Baru**

- ✅ Filter sidebar kiri (desktop) dengan kategori:
  - Jenis Toko (Pelajar/Mahasiswa, Toko Resmi, Affiliated Business, Civitas Akademis)
  - Lokasi (USU, UI, ITB, UGM + lihat selengkapnya)
  - Rating (5-1 bintang dengan "ke atas")
  - Tombol Reset Filter
- ✅ Area konten kanan dengan:
  - Tabs (Jual/Sewa/Pinjam) dengan styling hijau
  - Search bar terintegrasi
  - Dropdown sorting (Paling Populer, Terbaru, Harga Terendah/Tertinggi, Rating)
  - Product grid menggunakan komponen `ProductCard`
- ✅ Breadcrumb dengan Home icon
- ✅ Loading screen saat pertama kali masuk (2 detik)
- ✅ Bulletin popup muncul setelah scroll 10 detik
- ✅ Empty state dengan tombol reset filter

#### 2. **ProductDetail - Fitur Baru**

- ✅ **Cart dihapus** - sesuai permintaan user
- ✅ **Tombol Beli Sekarang** dengan auth check
- ✅ **Tombol Chat Seller** dengan auth check (hijau brand color)
- ✅ **Tombol Favorit** dengan:
  - Auth check (login required)
  - Toggle favorite (merah jika sudah difavoritkan)
  - Disimpan di localStorage (`unily_favorites`)
  - Alert success saat add/remove
- ✅ Breadcrumb menggunakan Home icon

#### 3. **Authentication Flow**

- ✅ Semua aksi yang memerlukan login (Buy, Favorite, Chat) akan menampilkan `LoginPopup`
- ✅ LoginPopup terintegrasi dengan `authService`
- ✅ Auto reload setelah login sukses

#### 4. **Loading & Popup**

- ✅ `LoadingScreen` muncul saat pertama load MarketplaceScreen
- ✅ `BulletinPopup` muncul otomatis setelah user scroll selama 10 detik
- ✅ Bulletin bisa ditutup dan tidak muncul lagi di session yang sama

---

## 🎯 Perbedaan dengan Versi Sebelumnya

### ❌ Yang Dihapus:

- Cart feature (tombol "Keranjang")
- Import `ShoppingCart` icon
- Handler `handleAddToCart`

### ✅ Yang Ditambahkan:

- Filter sidebar dengan collapsible sections
- Favorit system dengan localStorage
- Chat seller button
- Loading screen integration
- Bulletin popup dengan scroll trigger
- Auth checks untuk semua aksi sensitif
- Empty state dengan reset filter

---

## 📝 Technical Details

### State Management (MarketplaceScreen)

```javascript
const [loading, setLoading] = useState(true);
const [showBulletin, setShowBulletin] = useState(false);
const [filters, setFilters] = useState({
  sellerType: [],
  location: [],
  priceRange: [0, 100000000],
  condition: [],
  rating: 0,
});
const [expandedFilters, setExpandedFilters] = useState({
  sellerType: true,
  location: true,
  rating: true,
});
```

### LocalStorage Keys

- `unily_token` - Authentication token
- `unily_user` - User data
- `unily_favorites` - Array of favorited product IDs

### Color Scheme

- Primary: `oklch(0.4_0.15_140)` (hijau)
- Secondary: Orange (#f97316)
- Accent: Red untuk favorit

---

## 🚀 Cara Testing

1. **Test Filter Sidebar**:

   - Klik checkbox di Jenis Toko → produk terfilter
   - Pilih rating minimum → produk dengan rating >= selected tampil
   - Klik "Reset Filter" → semua filter dikosongkan

2. **Test Authentication**:

   - Logout dari aplikasi
   - Klik "Beli Sekarang" → LoginPopup muncul
   - Klik tombol Favorit → LoginPopup muncul
   - Klik "Chat Seller" → LoginPopup muncul

3. **Test Favorit**:

   - Login terlebih dahulu
   - Klik icon Heart → berubah merah + alert "Ditambahkan ke favorit"
   - Klik lagi → kembali abu-abu + alert "Dihapus dari favorit"

4. **Test Loading & Bulletin**:
   - Refresh halaman marketplace → loading screen 2 detik
   - Scroll di marketplace selama 10 detik → bulletin popup muncul

---

## 📌 Notes

- Semua styling menggunakan **Tailwind CSS v4** syntax (`bg-linear-to-*`)
- Role penjual menggunakan string `'penjual'` (bukan `'seller'`)
- Responsiveness: Sidebar hanya tampil di desktop (lg:block)
- Chat seller masih placeholder - bisa dikembangkan dengan fitur chat real

---

## 🔄 Next Steps (Opsional)

1. Implement real chat feature
2. Connect favorites ke backend API
3. Add pagination untuk product grid
4. Mobile filter drawer/modal
5. Advanced filter (harga range slider)
6. Filter by condition (Baru/Bekas)
