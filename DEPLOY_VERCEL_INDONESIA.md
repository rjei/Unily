# Panduan Deploy Monorepo Frontend & Backend ke Vercel

Panduan lengkap untuk mendeploy aplikasi Unily (frontend + backend) ke Vercel dalam satu monorepo.

## ✅ Apakah Bisa?

**Ya, bisa!** Vercel mendukung deployment monorepo dengan:
- **Frontend** (React + Vite) sebagai static site
- **Backend** (Express) sebagai serverless functions

Kedua aplikasi akan berjalan di domain yang sama, sehingga API calls menggunakan relative URL (`/api/...`).

## 📋 Prerequisites

1. **Akun Vercel** - Daftar gratis di [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket** - Repository sudah di-push ke Git
3. **Database PostgreSQL** - Sudah setup (bisa pakai Vercel Postgres, Neon, Supabase, atau provider lain)

## 🏗️ Struktur Monorepo

```
Unily/
├── src/                    # Frontend (React + Vite)
├── server/                 # Backend (Express)
│   ├── src/
│   └── package.json
├── api/                    # Vercel Serverless Functions
│   └── index.js           # Wrapper untuk Express app
├── vercel.json            # Konfigurasi Vercel
└── package.json           # Frontend dependencies
```

## 🚀 Langkah-langkah Deployment

### 1. Persiapan Repository

Pastikan semua perubahan sudah di-commit dan di-push:

```bash
git add .
git commit -m "Setup untuk deployment Vercel"
git push origin main
```

### 2. Setup Database PostgreSQL

Backend menggunakan PostgreSQL. Pilih salah satu provider:

#### Opsi A: Vercel Postgres (Recommended)
1. Di Vercel Dashboard, buka project Anda
2. Tab **Storage** → **Create Database** → Pilih **Postgres**
3. Vercel akan otomatis set environment variables

#### Opsi B: Neon (Free tier tersedia)
1. Daftar di [neon.tech](https://neon.tech)
2. Buat database baru
3. Copy connection string

#### Opsi C: Supabase (Free tier tersedia)
1. Daftar di [supabase.com](https://supabase.com)
2. Buat project baru
3. Dapatkan connection details dari Settings → Database

### 3. Setup Database Schema

Jalankan SQL berikut di database Anda:

```sql
CREATE TABLE IF NOT EXISTS users (
    id_users SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'pelanggan',
    dibuat DATE DEFAULT CURRENT_DATE
);
```

### 4. Deploy ke Vercel

#### Opsi A: Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik **"Add New..."** → **"Project"**
   - Pilih repository Unily Anda
   - Vercel akan otomatis mendeteksi framework Vite

3. **Konfigurasi Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (root project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Install Server Dependencies**
   
   Vercel perlu menginstall dependencies dari folder `server/`. Tambahkan **Build Command**:
   
   ```
   npm install && cd server && npm install && cd .. && npm run build
   ```
   
   Atau gunakan **Install Command** yang lebih cerdas (lihat bagian Advanced Configuration di bawah).

5. **Environment Variables**
   
   Klik **"Environment Variables"** dan tambahkan:

   ```
   # Database (gunakan dari provider PostgreSQL Anda)
   DB_HOST=your-db-host
   DB_PORT=5432
   DB_NAME=your-db-name
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   
   # Atau jika menggunakan connection string (Neon/Supabase):
   DATABASE_URL=postgresql://user:password@host:port/database
   
   # JWT Secret (generate secure random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=1h
   
   # CORS (opsional, untuk production)
   CLIENT_URL=https://your-app.vercel.app
   
   # Frontend API URL (untuk development)
   VITE_API_URL=
   ```

   **Catatan**: Biarkan `VITE_API_URL` kosong untuk menggunakan relative URLs (recommended untuk monorepo).

6. **Deploy**
   - Klik **"Deploy"**
   - Tunggu proses build selesai
   - Setelah selesai, Anda akan mendapat URL: `https://your-app.vercel.app`

#### Opsi B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DB_HOST
vercel env add DB_PORT
vercel env add DB_NAME
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add JWT_SECRET
vercel env add JWT_EXPIRES_IN

# Deploy production
vercel --prod
```

### 5. Konfigurasi Advanced (Opsional)

Jika build command terlalu kompleks, buat file `package.json` di root dengan script khusus:

```json
{
  "scripts": {
    "vercel-build": "npm run build",
    "install:all": "npm install && cd server && npm install"
  }
}
```

Lalu di Vercel Dashboard, set:
- **Install Command**: `npm run install:all`
- **Build Command**: `npm run vercel-build`

## 🔧 Konfigurasi File

### vercel.json

File ini sudah dikonfigurasi untuk:
- Frontend routing (React Router)
- Backend API routing (`/api/*` → serverless function)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "api/index.js": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### API Handler (api/index.js)

File ini sudah dibuat sebagai wrapper untuk Express app agar bisa berjalan sebagai serverless function.

## 📝 Environment Variables yang Diperlukan

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | PostgreSQL host | `ep-xxx.us-east-1.aws.neon.tech` | ✅ |
| `DB_PORT` | PostgreSQL port | `5432` | ✅ |
| `DB_NAME` | Database name | `unily_db` | ✅ |
| `DB_USER` | Database user | `postgres` | ✅ |
| `DB_PASSWORD` | Database password | `your-password` | ✅ |
| `JWT_SECRET` | Secret untuk JWT token | Random string | ✅ |
| `JWT_EXPIRES_IN` | Token expiration | `1h` | ❌ |
| `CLIENT_URL` | CORS origin | `https://your-app.vercel.app` | ❌ |
| `VITE_API_URL` | Frontend API URL | (kosongkan untuk relative) | ❌ |

**Catatan**: Jika menggunakan connection string (Neon/Supabase), gunakan variable `DATABASE_URL` sebagai alternatif.

## ✅ Verifikasi Deployment

1. **Cek Build Logs**
   - Di Vercel Dashboard → Project → Deployments
   - Klik deployment terbaru untuk melihat logs
   - Pastikan tidak ada error

2. **Test API Health Check**
   - Buka: `https://your-app.vercel.app/api/health`
   - Harus return: `{"status":"ok","timestamp":"..."}`

3. **Test Frontend**
   - Buka: `https://your-app.vercel.app`
   - Pastikan halaman load dengan benar

4. **Test Authentication**
   - Coba login/signup
   - Cek browser console (F12) untuk error
   - Cek Network tab untuk API calls

## 🐛 Troubleshooting

### Build Error: Module not found

**Masalah**: Server dependencies tidak terinstall.

**Solusi**:
1. Pastikan **Install Command** menginstall dependencies dari folder `server/`
2. Atau buat script di root `package.json` untuk install semua dependencies

### API Calls Failed: 500 Error

**Masalah**: Database connection error atau environment variables tidak ter-load.

**Solusi**:
1. Cek environment variables di Vercel Dashboard sudah benar
2. Test database connection dengan provider Anda
3. Pastikan database schema sudah dibuat
4. Cek function logs di Vercel Dashboard

### API Calls Failed: CORS Error

**Masalah**: CORS tidak mengizinkan request dari frontend.

**Solusi**:
1. Set `CLIENT_URL` environment variable ke domain Vercel Anda
2. Atau biarkan kosong untuk allow all origins (development)

### Function Timeout

**Masalah**: Serverless function timeout (default 10 detik untuk Hobby plan).

**Solusi**:
1. Optimize database queries
2. Upgrade ke Pro plan untuk timeout lebih lama
3. Gunakan database connection pooling

### Database Connection Issues

**Masalah**: Tidak bisa connect ke database.

**Solusi**:
1. Pastikan database provider mengizinkan connection dari Vercel IPs
2. Cek environment variables sudah benar
3. Test connection string di local terlebih dahulu
4. Untuk Neon/Supabase, pastikan SSL mode enabled

## 🔄 Update Deployment

Setiap kali Anda push ke repository, Vercel akan otomatis:
1. Mendeteksi perubahan
2. Build ulang aplikasi
3. Deploy versi baru

Anda juga bisa trigger manual deploy dari Vercel Dashboard.

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Express on Vercel](https://vercel.com/guides/deploying-express-with-vercel)

## 💡 Tips

1. **Gunakan Vercel Postgres** untuk kemudahan setup dan environment variables otomatis
2. **Enable Preview Deployments** untuk test sebelum production
3. **Setup Custom Domain** untuk domain sendiri
4. **Monitor Function Logs** untuk debugging
5. **Gunakan Environment Variables** untuk konfigurasi yang berbeda per environment

## 🆘 Butuh Bantuan?

Jika mengalami masalah:
1. Cek build logs di Vercel Dashboard
2. Cek browser console untuk error client-side
3. Cek function logs untuk error server-side
4. Pastikan semua environment variables sudah benar

