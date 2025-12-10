import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Package,
  Users,
  MessageCircle,
  UserPlus,
  UserCheck,
  Clock,
  ShoppingBag,
} from "lucide-react";
import LoadingScreen from "../../components/LoadingScreen";
import ProductCard from "../../components/common/ProductCard";

const SellerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("products"); // products, followers, following
  const [stats, setStats] = useState({ followers: 0, following: 0 });

  useEffect(() => {
    fetchSellerData();
  }, [id]);

  const fetchSellerData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("unily_token");

      // Fetch seller profile
      const profileRes = await fetch(
        `http://localhost:4000/api/sellers/${id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const profileData = await profileRes.json();

      if (profileData.success) {
        setSeller(profileData.seller);
        setIsFollowing(profileData.seller.isFollowing || false);
      }

      // Fetch seller products
      const productsRes = await fetch(
        `http://localhost:4000/api/sellers/${id}/products`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const productsData = await productsRes.json();

      if (productsData.success) {
        setProducts(productsData.products);
      }

      // Fetch followers count
      const followersRes = await fetch(
        `http://localhost:4000/api/sellers/${id}/followers`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const followersData = await followersRes.json();

      if (followersData.success) {
        setStats((prev) => ({
          ...prev,
          followers: followersData.followers.length,
        }));
      }

      // Fetch following count
      const followingRes = await fetch(
        `http://localhost:4000/api/sellers/users/${id}/following`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const followingData = await followingRes.json();

      if (followingData.success) {
        setStats((prev) => ({
          ...prev,
          following: followingData.following.length,
        }));
      }
    } catch (error) {
      console.error("Error fetching seller data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    const token = localStorage.getItem("unily_token");
    if (!token) {
      alert("Login dulu untuk follow seller");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/sellers/${id}/follow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setIsFollowing(!isFollowing);
        setStats((prev) => ({
          ...prev,
          followers: isFollowing ? prev.followers - 1 : prev.followers + 1,
        }));
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const handleChat = () => {
    // TODO: Open chat modal
    alert(`Chat dengan ${seller?.name} - Feature coming soon!`);
  };

  if (loading) return <LoadingScreen />;
  if (!seller)
    return <div className="text-center py-20">Seller tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seller Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-start gap-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {seller.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {seller.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{seller.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {seller.rating} ({seller.totalReviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Joined {seller.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleFollow}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      isFollowing
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleChat}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {products.length}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.followers}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.following}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Following
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {seller.totalSales}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4" />
                    Sales
                  </div>
                </div>
              </div>

              {/* Description */}
              {seller.description && (
                <p className="mt-4 text-gray-700">{seller.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 font-medium border-b-2 transition ${
                activeTab === "products"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("followers")}
              className={`py-4 font-medium border-b-2 transition ${
                activeTab === "followers"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Followers ({stats.followers})
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`py-4 font-medium border-b-2 transition ${
                activeTab === "following"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Following ({stats.following})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "products" && (
          <div>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Seller belum punya produk</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "followers" && (
          <div className="text-center py-20 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Followers list - Coming soon!</p>
          </div>
        )}

        {activeTab === "following" && (
          <div className="text-center py-20 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Following list - Coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfilePage;
