-- ==========================================
-- FILE: 01-unily-schema.sql
-- DESKRIPSI: Skema Database UAS (Tabel, View, Data Dummy, Security)
-- ==========================================

-- 1. BERSIH-BERSIH (RESET)
-- Hapus urut dari yang paling bergantung (View -> Table -> Type)
DROP VIEW IF EXISTS v_riwayat_transaksi;
DROP VIEW IF EXISTS v_katalog_lengkap;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS enum_status;
DROP TYPE IF EXISTS enum_product_type;
DROP TYPE IF EXISTS enum_role;

-- 2. MEMBUAT STRUKTUR TABEL (DDL)

-- Enum Types (Agar data konsisten)
CREATE TYPE enum_role AS ENUM ('admin', 'penjual', 'pelanggan');
CREATE TYPE enum_product_type AS ENUM ('jual', 'sewa');
CREATE TYPE enum_status AS ENUM ('pending', 'paid', 'processed', 'completed', 'cancelled');

-- Tabel Users
CREATE TABLE users (
  id_users SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role enum_role DEFAULT 'pelanggan',
  no_hp VARCHAR(50),
  alamat TEXT,
  dibuat TIMESTAMP DEFAULT NOW()
);

-- Tabel Products (Barang Fisik)
CREATE TABLE products (
  id_product SERIAL PRIMARY KEY,
  seller_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(15, 2) NOT NULL, -- Diubah ke 15 digit biar muat harga mahal
  category VARCHAR(100),
  stock INT DEFAULT 1,
  type enum_product_type NOT NULL,
  condition VARCHAR(50), -- 'baru' atau 'bekas'
  description TEXT,
  image_url TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_products_seller FOREIGN KEY (seller_id) REFERENCES users(id_users) ON DELETE CASCADE
);

-- Tabel Services (Jasa/Skill)
CREATE TABLE services (
  id_service SERIAL PRIMARY KEY,
  seller_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  rate DECIMAL(15, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL, -- misal: 'per jam', 'per proyek'
  category VARCHAR(100),
  description TEXT,
  image_url TEXT,
  availability BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_services_seller FOREIGN KEY (seller_id) REFERENCES users(id_users) ON DELETE CASCADE
);

-- Tabel Transactions (Transaksi Gabungan Barang & Jasa)
CREATE TABLE transactions (
  id_trx SERIAL PRIMARY KEY,
  buyer_id INT NOT NULL,
  product_id INT, -- NULL jika beli jasa
  service_id INT, -- NULL jika beli barang
  quantity INT DEFAULT 1,
  total_price DECIMAL(15, 2) NOT NULL,
  status enum_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_trx_buyer FOREIGN KEY (buyer_id) REFERENCES users(id_users) ON DELETE SET NULL,
  CONSTRAINT fk_trx_product FOREIGN KEY (product_id) REFERENCES products(id_product) ON DELETE SET NULL,
  CONSTRAINT fk_trx_service FOREIGN KEY (service_id) REFERENCES services(id_service) ON DELETE SET NULL
);

-- Tabel Reviews
CREATE TABLE reviews (
  id_review SERIAL PRIMARY KEY,
  trx_id INT UNIQUE NOT NULL, -- 1 Transaksi cuma boleh 1 review
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_review_trx FOREIGN KEY (trx_id) REFERENCES transactions(id_trx) ON DELETE CASCADE
);

-- Indexing (Syarat UAS: Optimasi Query)
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_transactions_buyer ON transactions(buyer_id);
CREATE INDEX idx_products_seller ON products(seller_id);

-- 3. MEMBUAT VIEW (Syarat UAS: Fitur Lanjutan)

-- View 1: Katalog Lengkap (Gabung Produk & Info Penjual)
CREATE OR REPLACE VIEW v_katalog_lengkap AS
SELECT 
    p.id_product,
    p.name AS product_name,
    p.price,
    p.category,
    p.type,
    p.condition,
    p.stock,
    u.nama AS seller_name,
    u.no_hp AS seller_contact,
    u.alamat AS seller_location
FROM products p
JOIN users u ON p.seller_id = u.id_users
WHERE p.stock > 0;

-- View 2: Riwayat Transaksi Lengkap
CREATE OR REPLACE VIEW v_riwayat_transaksi AS
SELECT 
    t.id_trx,
    t.created_at,
    buyer.nama AS pembeli,
    COALESCE(p.name, s.name) AS item_name, -- Ambil nama produk ATAU jasa
    CASE WHEN p.id_product IS NOT NULL THEN 'Barang' ELSE 'Jasa' END AS jenis,
    t.total_price,
    t.status,
    seller.nama AS penjual
FROM transactions t
JOIN users buyer ON t.buyer_id = buyer.id_users
LEFT JOIN products p ON t.product_id = p.id_product
LEFT JOIN services s ON t.service_id = s.id_service
JOIN users seller ON COALESCE(p.seller_id, s.seller_id) = seller.id_users;

-- 4. DATA DUMMY (SEEDING)
-- Biar pas demo database gak kosong

INSERT INTO users (nama, email, password, role, alamat) VALUES 
('Super Admin', 'admin@unily.com', 'hashpass', 'admin', 'Rektorat USU'),
('Budi Penjual', 'budi@mhs.usu.ac.id', 'hashpass', 'penjual', 'Fasilkom TI'),
('Siti Pembeli', 'siti@mhs.usu.ac.id', 'hashpass', 'pelanggan', 'FIB USU');

INSERT INTO products (seller_id, name, price, category, stock, type, condition, description, image_url) VALUES
(2, 'Laptop ASUS ROG Bekas', 8500000, 'Elektronik', 1, 'jual', 'bekas', 'Mulus no minus, pemakaian 1 tahun', 'https://placehold.co/600x400'),
(2, 'Buku Calculus Purcell', 50000, 'Buku', 5, 'jual', 'bekas', 'Edisi 9, ada coretan dikit', 'https://placehold.co/600x400'),
(2, 'Kamera Canon Sewa', 150000, 'Fotografi', 10, 'sewa', 'baik', 'Sewa per hari', 'https://placehold.co/600x400');

INSERT INTO services (seller_id, name, rate, unit, category, description) VALUES
(2, 'Jasa Install Ulang Windows', 50000, 'per device', 'Service Komputer', 'Termasuk install driver basic');

INSERT INTO transactions (buyer_id, product_id, total_price, status) VALUES
(3, 2, 50000, 'completed'); -- Siti beli buku dari Budi

-- 5. KEAMANAN & HAK AKSES (Syarat UAS: Security)

DO
$do$
BEGIN
   -- Cek apakah role sudah ada biar gak error kalau run ulang
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'unily_app') THEN

      CREATE ROLE unily_app WITH LOGIN PASSWORD 'app123';
   END IF;
END
$do$;

-- GRANT PERMISSIONS (PENTING!)
-- Pastikan nama database di bawah ini ('unily_db') SAMA dengan di compose.yaml
GRANT CONNECT ON DATABASE unily_db TO unily_app;

GRANT USAGE ON SCHEMA public TO unily_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO unily_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO unily_app;

-- Revoke hak delete user agar aplikasi tidak bisa hapus user sembarangan (Security)
REVOKE DELETE ON users FROM unily_app;