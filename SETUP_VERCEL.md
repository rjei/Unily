# Quick Start: Deploy ke Vercel

## Ringkasan Perubahan

Project ini sudah dikonfigurasi untuk deploy frontend dan backend ke Vercel dalam satu monorepo.

### File yang Ditambahkan/Dimodifikasi:

1. **`api/index.js`** - Serverless function wrapper untuk Express backend
2. **`api/package.json`** - Dependencies untuk serverless function
3. **`vercel.json`** - Konfigurasi routing untuk frontend dan backend
4. **`DEPLOY_VERCEL_INDONESIA.md`** - Dokumentasi lengkap dalam bahasa Indonesia

### Frontend Changes:

- ✅ Semua hardcoded `localhost:5000` sudah diganti dengan dynamic API URL
- ✅ Menggunakan relative URLs (`/api/...`) untuk production di Vercel
- ✅ Fallback ke `localhost:5000` untuk development

### Backend Changes:

- ✅ CORS configuration sudah diupdate untuk support Vercel
- ✅ Express app siap sebagai serverless function

## Quick Deploy Steps

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Setup Vercel deployment"
   git push
   ```

2. **Import ke Vercel**
   - Login ke [vercel.com](https://vercel.com)
   - Klik "Add New Project"
   - Pilih repository Unily
   - Framework: Vite (auto-detect)

3. **Set Environment Variables**
   - `DB_HOST` - PostgreSQL host
   - `DB_PORT` - 5432
   - `DB_NAME` - Database name
   - `DB_USER` - Database user
   - `DB_PASSWORD` - Database password
   - `JWT_SECRET` - Random secure string

4. **Install Command** (di Vercel Dashboard)
   ```
   npm install && cd server && npm install && cd ..
   ```

5. **Deploy!**

Lihat **DEPLOY_VERCEL_INDONESIA.md** untuk panduan lengkap.

## Testing

Setelah deploy, test:
- `https://your-app.vercel.app` - Frontend
- `https://your-app.vercel.app/api/health` - Backend health check

