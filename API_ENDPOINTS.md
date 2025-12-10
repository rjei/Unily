# Unily API Endpoints Documentation

## Base URL

```
Development: http://localhost:4000/api
Production: [To be configured]
```

## Authentication

### 1. User Signup

**Endpoint:** `POST /auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@usu.ac.id",
  "password": "securepassword123"
}
```

**Validation Rules:**

- `name`: Required, string, min 2 characters
- `email`: Required, must match pattern `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.ac\.id$/i`
- `password`: Required, string, min 6 characters

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@usu.ac.id",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

- `400`: Validation error (invalid email format, missing fields)
- `409`: Email already exists
- `500`: Server error

---

### 2. User Login

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "john.doe@usu.ac.id",
  "password": "securepassword123"
}
```

**Validation Rules:**

- `email`: Required, must be valid .ac.id domain
- `password`: Required

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@usu.ac.id",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

- `400`: Validation error
- `401`: Invalid credentials
- `500`: Server error

---

### 3. Seller Signup

**Endpoint:** `POST /auth/signup-seller`

**Request Body:**

```json
{
  "name": "Jane Seller",
  "email": "jane.seller@ui.ac.id",
  "password": "securepassword123"
}
```

**Same validation rules as user signup**

**Success Response (201):**

```json
{
  "success": true,
  "message": "Seller registered successfully",
  "data": {
    "user": {
      "id": 2,
      "name": "Jane Seller",
      "email": "jane.seller@ui.ac.id",
      "role": "seller"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4. Seller Login

**Endpoint:** `POST /auth/login-seller`

**Same request/response format as user login**

---

## Payments

### 5. Create Payment Transaction

**Endpoint:** `POST /payments/create-transaction`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "orderId": "ORDER-123456",
  "grossAmount": 50000
}
```

**Success Response (200):**

```json
{
  "success": true,
  "token": "snap_token_string_from_midtrans",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/..."
}
```

**Error Responses:**

- `401`: Unauthorized (invalid/missing token)
- `400`: Validation error (missing orderId or grossAmount)
- `500`: Midtrans API error or server error

---

## User Management

### 6. Get Current User

**Endpoint:** `GET /users/me`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@usu.ac.id",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 7. Update User Profile

**Endpoint:** `PUT /users/profile`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Updated",
  "email": "john.updated@usu.ac.id"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@usu.ac.id",
    "role": "user"
  }
}
```

---

## Seller Management

### 8. Get Seller Profile

**Endpoint:** `GET /sellers/profile`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Jane Seller",
    "email": "jane.seller@ui.ac.id",
    "role": "seller",
    "products": [...]
  }
}
```

---

### 9. Create Product (Seller Only)

**Endpoint:** `POST /sellers/products`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 100000,
  "category": "electronics"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Product Name",
    "price": 100000,
    "sellerId": 2
  }
}
```

---

## Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email must be from an academic domain (.ac.id)"
    }
  ]
}
```

---

## Authentication Flow

1. **Signup/Login:**

   - Client sends credentials to `/auth/signup` or `/auth/login`
   - Server validates and returns JWT token
   - Client stores token in localStorage as `unily_token`
   - Client stores user data in localStorage as `unily_user`

2. **Authenticated Requests:**

   - Client includes token in Authorization header: `Bearer <token>`
   - Server validates token and attaches user to request
   - Protected routes check user role if needed

3. **Token Expiration:**
   - Tokens expire after 7 days (configurable in JWT_EXPIRES_IN)
   - Client should handle 401 responses by redirecting to login
   - Refresh token mechanism: TODO

---

## Midtrans Payment Flow

1. **Create Transaction:**

   - Client calls `/payments/create-transaction` with orderId and amount
   - Server creates transaction with Midtrans API
   - Returns snap token to client

2. **Process Payment:**

   - Client loads Midtrans Snap SDK
   - Opens payment modal with snap token
   - User completes payment on Midtrans page

3. **Payment Callback:**
   - Midtrans sends notification to server webhook
   - Server updates order status
   - Client receives success/failure callback

---

## Environment Variables

**Backend (.env):**

```bash
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://superadmin:passwordAdmin123@db:5432/unily_db
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false
```

**Frontend (.env):**

```bash
VITE_API_URL=http://localhost:4000/api
VITE_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

---

## Rate Limiting

- All endpoints: 100 requests per 15 minutes per IP
- Auth endpoints: 5 requests per 15 minutes per IP
- Payment endpoints: 10 requests per minute per user

---

## CORS Policy

Allowed origins:

- `http://localhost:5173` (development)
- `https://unily.vercel.app` (production)

Allowed methods: GET, POST, PUT, DELETE, PATCH
Allowed headers: Content-Type, Authorization

---

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

---

## Testing with cURL

### Signup:

```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@usu.ac.id","password":"password123"}'
```

### Login:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@usu.ac.id","password":"password123"}'
```

### Get User (with token):

```bash
curl -X GET http://localhost:4000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Docker Deployment

### Build and Run:

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

### Access Services:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Database: localhost:5432
- pgAdmin: http://localhost:5050

---

**Last Updated:** 2024
**Version:** 1.0.0
