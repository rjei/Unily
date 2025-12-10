# 🛒 Unily

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)

Unily adalah platform marketplace & sharing economy digital yang terverifikasi, dibangun khusus untuk ekosistem kampus Indonesia. Unily menyediakan solusi hibrida unik yang memungkinkan mahasiswa menyewa, meminjam, dan menjual barang bekas (Marketplace Hub) sekaligus membeli jasa/skill profesional (Services Hub).

---

## ✨ Features

### 🔐 Authentication System

- ✅ **Academic Email Verification** - Support semua domain `.ac.id` (USU, UI, ITB, UGM, dll)
- ✅ **JWT Token Authentication** - Secure token-based auth
- ✅ **Role-Based Access** - User & Seller roles
- ✅ **Inline Error Handling** - User-friendly error display

### 💳 Payment Integration

- ✅ **Midtrans Snap** - Secure payment gateway
- ✅ **Multiple Payment Methods** - Credit card, e-wallet, bank transfer
- ✅ **Real-time Payment Status** - Success, pending, failed callbacks
- ✅ **Transaction Management** - Order tracking system

### 🏪 Marketplace Features

- ✅ **Product Listing** - Browse and search products
- ✅ **Seller Dashboard** - Manage products and orders
- ✅ **Order Management** - Track purchases and sales
- ✅ **Search & Filters** - Find products easily

### 👨‍💼 Services Hub

- ✅ **Professional Services** - Tutoring, design, development
- ✅ **Service Provider Profiles** - Verified academic professionals
- ✅ **Service Booking** - Schedule and pay for services

---

## ⚙️ Tech Stack

### Frontend

- **React 18** - Modern UI library
- **Vite 5** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **lucide-react** - Beautiful icons

### Backend

- **Node.js 20** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL 16** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Payment

- **Midtrans Snap** - Payment gateway integration

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub** - Version control

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (optional, included in Docker)
- Midtrans Account

### Installation

#### Option 1: Docker (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/unily.git
cd unily

# 2. Setup environment variables
cp .env.example .env
cp server/.env.example server/.env

# Edit .env files with your Midtrans keys

# 3. Build and run with Docker
docker-compose build
docker-compose up -d

# 4. Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:4000
# pgAdmin: http://localhost:5050
```

#### Option 2: Manual Setup

```bash
# 1. Clone repository
git clone https://github.com/yourusername/unily.git
cd unily

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd server
npm install

# 4. Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Run database migrations
psql -U postgres -c "CREATE DATABASE unily_db;"
psql -U postgres -d unily_db -f init-scripts/01-unily-schema.sql

# 6. Start backend
npm start

# 7. Start frontend (in new terminal)
cd ..
npm run dev
```

---

## 📚 Documentation

- **[API Endpoints](./API_ENDPOINTS.md)** - Complete API documentation
- **[Docker Deployment](./DOCKER_DEPLOYMENT.md)** - Deployment guide
- **[Authentication Transformation](./AUTHENTICATION_TRANSFORMATION.md)** - System architecture

---

## 🔧 Configuration

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:4000/api
VITE_MIDTRANS_CLIENT_KEY=your_client_key_here
```

### Backend (server/.env)

```bash
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://superadmin:passwordAdmin123@localhost:5432/unily_db
JWT_SECRET=your_super_secret_jwt_key_here
MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here
```

---

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
npm test

# Backend tests
cd server
npm test
```

### Test with cURL

**Signup:**

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@usu.ac.id","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@usu.ac.id","password":"password123"}'
```

---

## 📁 Project Structure

```
unily/
├── src/                      # Frontend source
│   ├── components/           # React components
│   │   ├── common/           # Reusable components
│   │   ├── payment/          # Payment components
│   │   └── popup/            # Modal components
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── services/             # API services
│   └── utils/                # Utility functions
├── server/                   # Backend source
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   └── utils/            # Backend utilities
│   └── Dockerfile            # Backend container
├── init-scripts/             # Database initialization
├── compose.yaml              # Docker Compose config
├── Dockerfile.frontend       # Frontend container
└── README.md                 # This file
```

---

## 🎯 Key Features Implementation

### ErrorBanner Component

```jsx
<ErrorBanner
  error={{
    type: "validation",
    message: "Email harus dari domain akademik",
    details: "Gunakan email kampus Anda (.ac.id)",
  }}
  onDismiss={() => setError(null)}
/>
```

### Payment Button

```jsx
<PaymentButton
  orderId="ORDER-123"
  grossAmount={50000}
  onPaymentSuccess={(result) => console.log("Success:", result)}
  onPaymentError={(error) => console.log("Error:", error)}
  buttonText="Bayar Sekarang"
/>
```

---

## 🐛 Troubleshooting

### Docker Issues

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f backend

# Restart services
docker-compose restart

# Clean start
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Common Issues

- **Port already in use**: Change port in compose.yaml
- **Database connection failed**: Check DATABASE_URL in .env
- **CORS error**: Verify CLIENT_ORIGIN matches frontend URL
- **Payment failed**: Check Midtrans keys are correct

See [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for detailed troubleshooting.

---

## 🔐 Security

- JWT tokens with 7-day expiration
- bcrypt password hashing (10 rounds)
- CORS protection
- Environment variables for secrets
- Input validation and sanitization
- SQL injection protection with parameterized queries

---

## 📈 Roadmap

### Version 2.1 (Next Release)

- [ ] Email verification
- [ ] Password reset via email
- [ ] Refresh token mechanism
- [ ] Rate limiting
- [ ] Automated testing

### Version 3.0 (Future)

- [ ] Social login (Google, Microsoft)
- [ ] Two-factor authentication
- [ ] Real-time notifications
- [ ] Mobile app
- [ ] Admin dashboard

---

## 🤵 Team

**Development Team:**

- Muhammad Rizki Muda | 241401045
- Phan Topik | 241401054
- Richard Jonathan | 241401093
- Fernando Valens Junior Ginting | 241401126

**Institution:** Universitas Sumatera Utara (USU)

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 🙏 Acknowledgments

- **Midtrans** - Payment gateway integration
- **Docker** - Containerization platform
- **PostgreSQL** - Database system
- **React** - Frontend framework
- **Express** - Backend framework

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/unily/issues)
- **Documentation**: See docs/ folder
- **Email**: support@unily.com

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Last Updated:** 2024  
**Version:** 2.0.0 (Authentication & Payment System Overhaul)  
**Status:** ✅ Production Ready
