# 🏗️ UNILY - ARCHITECTURE OVERVIEW

## 📊 PRODUCTION ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER / CLIENT                            │
│                     (Web Browser / Mobile)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  React + Vite Application                                  │ │
│  │  • Pages (Home, Profile, Marketplace)                      │ │
│  │  • Components (Navbar, Cards, Modals)                      │ │
│  │  • Services (API calls with Axios)                         │ │
│  │  • Hooks (Custom hooks)                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Environment Variables:                                          │
│  • VITE_API_URL=https://unily-backend.onrender.com/api          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS / REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RENDER (Backend)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Node.js + Express Server                                  │ │
│  │                                                             │ │
│  │  API Endpoints:                                             │ │
│  │  • /api/auth     → Authentication (Login/Register)         │ │
│  │  • /api/users    → User Management                         │ │
│  │  • /api/sellers  → Product Management                      │ │
│  │  • /api/wishlist → Wishlist Operations                     │ │
│  │  • /api/chat     → Chat System                             │ │
│  │  • /api/payments → Payment Processing                      │ │
│  │                                                             │ │
│  │  Middleware:                                                │ │
│  │  • CORS (Cross-Origin)                                     │ │
│  │  • JWT Authentication                                       │ │
│  │  • Error Handler                                            │ │
│  │  • Body Parser                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Environment Variables:                                          │
│  • PORT, NODE_ENV                                                │
│  • DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME              │
│  • JWT_SECRET, JWT_EXPIRES_IN                                   │
│  • CLIENT_ORIGIN (CORS)                                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ PostgreSQL Protocol (SSL)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SUPABASE (Database)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  PostgreSQL 14+ (Cloud Hosted)                             │ │
│  │                                                             │ │
│  │  Tables:                                                    │ │
│  │  • users              → User accounts                      │ │
│  │  • products           → Products (buy/rent)                │ │
│  │  • services           → Services/skills                    │ │
│  │  • transactions       → Purchase history                   │ │
│  │  • reviews            → Product reviews                    │ │
│  │  • chat_rooms         → Chat conversations                 │ │
│  │  • chat_messages      → Chat messages                      │ │
│  │  • follows            → Follow system                      │ │
│  │  • wishlists          → Saved products                     │ │
│  │                                                             │ │
│  │  Performance:                                               │ │
│  │  • Indexes on foreign keys                                 │ │
│  │  • Indexes on frequently queried columns                   │ │
│  │  • Views for complex queries                               │ │
│  │                                                             │ │
│  │  Advanced Features:                                         │ │
│  │  • Triggers (auto update stock)                            │ │
│  │  • Functions (calculate totals)                            │ │
│  │  • Row Level Security (disabled - backend handles auth)    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Connection:                                                     │
│  • Connection Pooling (Transaction mode)                         │
│  • Port: 6543                                                    │
│  • SSL Enabled                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 REQUEST FLOW

### 1️⃣ User Registration Flow

```
User (Browser)
    │
    │ 1. Fill registration form
    │    POST /api/auth/register
    ▼
Vercel (Frontend)
    │
    │ 2. Send JSON payload
    │    { nama, email, password, role }
    ▼
Render (Backend)
    │
    │ 3. Validate input
    │ 4. Hash password (bcrypt)
    │ 5. Generate JWT token
    │ 6. INSERT INTO users
    ▼
Supabase (Database)
    │
    │ 7. Store user record
    │ 8. Return user ID
    ▼
Render (Backend)
    │
    │ 9. Send response with token
    ▼
Vercel (Frontend)
    │
    │ 10. Store token in localStorage
    │ 11. Redirect to dashboard
    ▼
User (Browser)
```

### 2️⃣ Product Browsing Flow

```
User (Browser)
    │
    │ 1. Visit marketplace page
    │    GET /api/sellers/products
    ▼
Vercel (Frontend)
    │
    │ 2. Request products
    ▼
Render (Backend)
    │
    │ 3. Query database
    │    SELECT * FROM products
    │    WHERE stock > 0
    ▼
Supabase (Database)
    │
    │ 4. Execute query (use index)
    │ 5. Return product rows
    ▼
Render (Backend)
    │
    │ 6. Format response
    │ 7. Send JSON array
    ▼
Vercel (Frontend)
    │
    │ 8. Render ProductCard components
    ▼
User (Browser)
```

### 3️⃣ Protected Route Flow

```
User (Browser)
    │
    │ 1. Access profile page
    │    GET /api/users/profile
    │    Header: Authorization: Bearer [TOKEN]
    ▼
Vercel (Frontend)
    │
    │ 2. Get token from localStorage
    │ 3. Add to request headers
    ▼
Render (Backend)
    │
    │ 4. Middleware: Verify JWT
    │ 5. Decode user ID from token
    │ 6. Query user data
    ▼
Supabase (Database)
    │
    │ 7. SELECT * FROM users WHERE id = ?
    │ 8. Return user data
    ▼
Render (Backend)
    │
    │ 9. Send user profile
    ▼
Vercel (Frontend)
    │
    │ 10. Display profile page
    ▼
User (Browser)
```

---

## 🔐 SECURITY LAYERS

```
┌────────────────────────────────────────────────┐
│  Layer 1: HTTPS (SSL/TLS)                      │
│  • All traffic encrypted                       │
│  • Certificate managed by Vercel/Render        │
└────────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────┐
│  Layer 2: CORS Policy                          │
│  • Only allow requests from frontend domain    │
│  • CLIENT_ORIGIN validation                    │
└────────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────┐
│  Layer 3: JWT Authentication                   │
│  • Token-based auth                            │
│  • Expiry: 7 days                              │
│  • Stateless validation                        │
└────────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────┐
│  Layer 4: Password Hashing                     │
│  • bcrypt with salt rounds                     │
│  • Never store plain passwords                 │
└────────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────┐
│  Layer 5: Database Security                    │
│  • Connection pooling                          │
│  • SSL connection to Supabase                  │
│  • Prepared statements (prevent SQL injection) │
└────────────────────────────────────────────────┘
```

---

## 📦 DEPLOYMENT ENVIRONMENTS

### Local Development

```
┌─────────────────────────────────────────┐
│  Docker Compose                          │
│  ┌────────────────────────────────────┐ │
│  │  PostgreSQL Container              │ │
│  │  Port: 5432                        │ │
│  │  Volume: ./docker-data             │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
            ▲
            │
┌───────────┴─────────┐
│  Backend (Node.js)  │
│  Port: 4000         │
│  npm run dev        │
└───────────┬─────────┘
            │
            ▼
┌─────────────────────┐
│  Frontend (Vite)    │
│  Port: 5173         │
│  npm run dev        │
└─────────────────────┘
```

### Production

```
┌─────────────────────────────────────────┐
│  Supabase (Database)                     │
│  • Managed PostgreSQL                    │
│  • Automatic backups                     │
│  • Connection pooling                    │
└─────────────────────────────────────────┘
            ▲
            │
┌───────────┴─────────┐
│  Render (Backend)   │
│  • Auto deploy      │
│  • HTTPS enabled    │
│  • Free tier        │
└───────────┬─────────┘
            │
            ▼
┌─────────────────────┐
│  Vercel (Frontend)  │
│  • Edge network     │
│  • HTTPS enabled    │
│  • Free tier        │
└─────────────────────┘
```

---

## 🔄 CI/CD PIPELINE

```
GitHub Repository
      │
      │ git push
      ▼
┌─────────────────────────────────────────┐
│  Automatic Deployment                    │
│                                          │
│  Vercel (Frontend):                      │
│  1. Detect push to main branch           │
│  2. npm install                          │
│  3. npm run build                        │
│  4. Deploy to CDN                        │
│  5. Invalidate cache                     │
│  6. ✅ Live in ~2 minutes                │
│                                          │
│  Render (Backend):                       │
│  1. Detect push to main branch           │
│  2. cd server && npm install             │
│  3. npm start                            │
│  4. Health check                         │
│  5. ✅ Live in ~3 minutes                │
└─────────────────────────────────────────┘
```

---

## 📊 DATABASE SCHEMA DIAGRAM

```
┌─────────────────┐
│     USERS       │
│─────────────────│
│ • id_users (PK) │
│ • nama          │
│ • email (UQ)    │
│ • password      │
│ • role (ENUM)   │
│ • no_hp         │
│ • alamat        │
│ • dibuat        │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌──────────────────┐
│   PRODUCTS      │       │    SERVICES      │
│─────────────────│       │──────────────────│
│ • id_product(PK)│       │ • id_service(PK) │
│ • seller_id(FK) │       │ • seller_id (FK) │
│ • name          │       │ • name           │
│ • price         │       │ • rate           │
│ • category      │       │ • unit           │
│ • stock         │       │ • category       │
│ • type (ENUM)   │       │ • description    │
│ • condition     │       │ • availability   │
│ • description   │       └──────────────────┘
│ • image_url     │                │
│ • location      │                │
└────────┬────────┘                │
         │                         │
         │ 1:N                     │ 1:N
         ▼                         ▼
┌──────────────────────────────────────┐
│          TRANSACTIONS                │
│──────────────────────────────────────│
│ • id_trx (PK)                        │
│ • buyer_id (FK → users)              │
│ • product_id (FK → products, NULL)   │
│ • service_id (FK → services, NULL)   │
│ • quantity                           │
│ • total_price                        │
│ • status (ENUM)                      │
│ • notes                              │
│ • created_at                         │
└────────┬─────────────────────────────┘
         │
         │ 1:1
         ▼
┌─────────────────┐
│    REVIEWS      │
│─────────────────│
│ • id_review(PK) │
│ • trx_id (FK)   │
│ • rating (1-5)  │
│ • comment       │
│ • created_at    │
└─────────────────┘

┌─────────────────┐       ┌──────────────────┐
│   CHAT_ROOMS    │       │  CHAT_MESSAGES   │
│─────────────────│       │──────────────────│
│ • id (PK)       │◄──────│ • id (PK)        │
│ • buyer_id (FK) │  1:N  │ • room_id (FK)   │
│ • seller_id(FK) │       │ • sender_id (FK) │
│ • created_at    │       │ • message        │
│ • updated_at    │       │ • is_read        │
└─────────────────┘       │ • created_at     │
                          └──────────────────┘

┌─────────────────┐       ┌──────────────────┐
│    FOLLOWS      │       │   WISHLISTS      │
│─────────────────│       │──────────────────│
│ • id (PK)       │       │ • id (PK)        │
│ • follower_id   │       │ • user_id (FK)   │
│ • following_id  │       │ • product_id(FK) │
│ • created_at    │       │ • created_at     │
└─────────────────┘       └──────────────────┘
```

---

## 🎯 PERFORMANCE OPTIMIZATIONS

### Database

- ✅ Connection pooling (max 20 connections)
- ✅ Indexes on foreign keys
- ✅ Indexes on frequently queried columns
- ✅ Views for complex joins

### Backend

- ✅ JWT stateless authentication
- ✅ Environment-based logging
- ✅ Error handling middleware
- ✅ CORS preflight caching

### Frontend

- ✅ Code splitting
- ✅ Lazy loading components
- ✅ Vite build optimization
- ✅ CDN delivery (Vercel Edge)

---

## 💰 COST BREAKDOWN (Free Tier)

| Service   | Free Tier Limits           | Cost if Exceeded |
| --------- | -------------------------- | ---------------- |
| Supabase  | 500MB DB, 2GB bandwidth    | $25/month        |
| Render    | 750 hours/month            | $7/month         |
| Vercel    | 100GB bandwidth/month      | $20/month        |
| **Total** | **FREE for small traffic** | **~$52/month**   |

---

## 📈 SCALABILITY

### Current (Free Tier)

- **Users**: ~100 concurrent
- **Requests**: ~10k/day
- **Storage**: 500MB

### Upgrade Path

1. **Hobby/Pro Tier** ($25-50/month)

   - Users: ~1000 concurrent
   - Requests: ~100k/day
   - Storage: 8GB

2. **Business Tier** ($100-200/month)
   - Users: ~10k concurrent
   - Requests: ~1M/day
   - Storage: 100GB

---

**Documentation Version**: 1.0.0  
**Last Updated**: December 10, 2025
