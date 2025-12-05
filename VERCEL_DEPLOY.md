# Panduan Deploy ke Vercel

Panduan lengkap untuk mendeploy aplikasi Unily ke Vercel.

## Prerequisites

1. Akun Vercel (gratis di [vercel.com](https://vercel.com))
2. Akun GitHub/GitLab/Bitbucket (untuk menghubungkan repository)
3. Backend API sudah di-deploy (bisa di Vercel Serverless Functions, Railway, Render, atau platform lain)

## Langkah-langkah Deployment

### 1. Persiapan Repository

Pastikan semua perubahan sudah di-commit dan di-push ke repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy Frontend ke Vercel

#### Opsi A: Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik "Add New..." → "Project"
   - Pilih repository Unily Anda
   - Vercel akan otomatis mendeteksi framework Vite

3. **Konfigurasi Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (root project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Klik "Environment Variables"
   - Tambahkan variable berikut:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-api-url.com
     ```
   - Pilih environment: Production, Preview, Development
   - Klik "Save"

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai
   - Setelah selesai, Anda akan mendapat URL seperti: `https://unily.vercel.app`

#### Opsi B: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_URL
   # Masukkan URL backend API Anda
   ```

5. **Deploy Production**
   ```bash
   vercel --prod
   ```

### 3. Deploy Backend (Opsional - jika ingin menggunakan Vercel Serverless Functions)

Jika Anda ingin mendeploy backend juga ke Vercel, ikuti langkah berikut:

1. **Buat folder `api` di root project**
   ```bash
   mkdir api
   ```

2. **Convert Express routes ke Vercel Serverless Functions**
   - Setiap route perlu dibuat sebagai file terpisah di folder `api/`
   - Contoh: `api/auth.js`, `api/users.js`, dll.

3. **Update `vercel.json`** untuk include backend routes

**Catatan**: Untuk backend dengan database PostgreSQL dan file storage, lebih disarankan menggunakan platform seperti:
- **Railway** (railway.app) - Mudah setup database
- **Render** (render.com) - Free tier tersedia
- **Heroku** (heroku.com) - Populer untuk Node.js apps

### 4. Konfigurasi CORS di Backend

Pastikan backend Anda mengizinkan request dari domain Vercel:

```javascript
// Di server/src/app.js atau config CORS
const corsOptions = {
  origin: [
    'http://localhost:5173', // Development
    'https://your-app.vercel.app', // Production Vercel URL
  ],
  credentials: true,
};
```

Atau gunakan environment variable:

```javascript
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
```

### 5. Verifikasi Deployment

1. **Cek Build Logs**
   - Di Vercel Dashboard → Project → Deployments
   - Klik deployment terbaru untuk melihat logs

2. **Test Aplikasi**
   - Buka URL yang diberikan Vercel
   - Test fitur-fitur utama:
     - Login/Signup
     - Navigasi halaman
     - API calls

3. **Cek Console Browser**
   - Buka Developer Tools (F12)
   - Cek tab Console untuk error
   - Cek tab Network untuk melihat API calls

## Troubleshooting

### Build Error: Module not found
- Pastikan semua dependencies sudah terinstall
- Cek `package.json` untuk dependencies yang hilang

### API Calls Failed: CORS Error
- Pastikan backend sudah dikonfigurasi untuk mengizinkan domain Vercel
- Cek environment variable `VITE_API_URL` sudah benar

### Environment Variables tidak ter-load
- Pastikan variable dimulai dengan `VITE_` untuk Vite
- Re-deploy setelah menambahkan environment variables

### Routing tidak bekerja (404 pada refresh)
- File `vercel.json` sudah benar dengan rewrites
- Pastikan semua routes di-handle oleh React Router

## Environment Variables yang Diperlukan

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | URL backend API | `https://api.unily.com` |

## Custom Domain (Opsional)

1. Di Vercel Dashboard → Project → Settings → Domains
2. Tambahkan domain Anda
3. Ikuti instruksi untuk setup DNS
4. Vercel akan otomatis setup SSL certificate

## Update Deployment

Setiap kali Anda push ke repository, Vercel akan otomatis:
1. Mendeteksi perubahan
2. Build ulang aplikasi
3. Deploy versi baru

Anda juga bisa trigger manual deploy dari Vercel Dashboard.

## Support

Jika mengalami masalah:
1. Cek [Vercel Documentation](https://vercel.com/docs)
2. Cek build logs di Vercel Dashboard
3. Cek browser console untuk error client-side


