import { createBrowserRouter, Navigate } from "react-router-dom";

// 1. IMPORT LAYOUT
import MainLayout from "../components/layouts/MainLayout";

// 2. IMPORT PAGES
import AuthScreen from "../pages/AuthScreen";
import HomeScreen from "../pages/HomeScreen";
import MarketplaceScreen from "../pages/marketplace/MarketplaceScreen";
import ProductDetail from "../pages/marketplace/ProductDetail";
import WishlistScreen from "../pages/marketplace/WishlistScreen";
import ServicesScreen from "../pages/services/ServicesScreen";
import ServiceDetail from "../pages/services/ServiceDetail";
import ProfileScreen from "../pages/ProfileScreen";
import ProfileSettingsScreen from "../pages/ProfileSettingsScreen";
import SearchResultsScreen from "../pages/SearchResultsScreen";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";

// Seller
import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerRegister from "../pages/seller/SellerRegister";
import SellerProfilePage from "../pages/seller/SellerProfilePage";

// 3. PROTECTED ROUTE WRAPPER
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("unily_token"); // Pastikan key token sesuai (unily_token)

  if (!token) {
    // Redirect ke login jika belum login
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 4. DEFINISI ROUTER
const router = createBrowserRouter([
  // --- A. PUBLIC ROUTES (Login & Signup) ---
  {
    path: "/login",
    element: <AuthScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <AuthScreen />,
    errorElement: <ErrorPage />,
  },

  // --- B. MAIN APP ROUTES (Campuran Public & Protected) ---
  {
    path: "/",
    element: <MainLayout />, // ✅ FIX: Hapus ProtectedRoute disini (Jadikan Public)
    errorElement: <ErrorPage />,
    children: [
      // 1. Public Pages (Bisa diakses siapa saja)
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "home",
        element: <HomeScreen />,
      },
      {
        path: "marketplace",
        element: <MarketplaceScreen />,
      },
      {
        path: "marketplace/detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishlistScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "services",
        element: (
          <ServicesScreen
            onNavigate={(page, data) => {
              if (page) {
                window.location.href = `/services/${page}`;
              }
            }}
          />
        ),
      },
      {
        path: "services/detail/:id",
        element: <ServiceDetail />,
      },
      {
        path: "search",
        element: <SearchResultsScreen />,
      },
      {
        path: "seller/:id",
        element: <SellerProfilePage />,
      },

      // 2. Protected Pages (Hanya User Login)
      // Kita bungkus satu-satu atau grouping
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/settings", // Sesuaikan path profile settings
        element: (
          <ProtectedRoute>
            <ProfileSettingsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller",
        element: (
          <ProtectedRoute>
            <SellerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/register",
        element: (
          <ProtectedRoute>
            <SellerRegister />
          </ProtectedRoute>
        ),
      },

      // 3. Fallback 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
