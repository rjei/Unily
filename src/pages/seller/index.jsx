// Legacy seller page - redirects to dashboard
import { useEffect } from "react";
import SellerDashboard from "../../pages/seller/SellerDashboard";

function Seller({ onNavigate, currentUser }) {
  useEffect(() => {
    // Redirect to seller-dashboard route
    if (onNavigate) {
      onNavigate("seller-dashboard");
    }
  }, [onNavigate]);

  return <SellerDashboard currentUser={currentUser} onNavigate={onNavigate} />;
}

export default Seller;
