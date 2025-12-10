import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  TrendingUp,
  Package,
  Eye,
  Settings,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Filter,
} from "lucide-react";
import LoadingScreen from "../../components/LoadingScreen";
import ProductModal from "../../components/seller/ProductModal";
import SalesChart from "../../components/seller/SalesChart";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
      views: 2341,
      sales: 156,
      stock: 45,
      price: 299000,
      category: "Elektronik",
    },
    {
      id: 2,
      name: "USB-C Cable 2M",
      image:
        "https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=100",
      views: 1245,
      sales: 89,
      stock: 120,
      price: 45000,
      category: "Aksesoris",
    },
    {
      id: 3,
      name: "Kemeja Denim Vintage",
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=100",
      views: 876,
      sales: 34,
      stock: 8,
      price: 85000,
      category: "Fashion",
    },
  ]);
  const [orderFilter, setOrderFilter] = useState("all");

  // Sales data for chart (mock 7 days)
  const salesData = [
    { label: "Sen", value: 450000 },
    { label: "Sel", value: 680000 },
    { label: "Rab", value: 520000 },
    { label: "Kam", value: 890000 },
    { label: "Jum", value: 750000 },
    { label: "Sab", value: 920000 },
    { label: "Min", value: 640000 },
  ];

  // Check if user is seller
  useEffect(() => {
    const userStr = localStorage.getItem("unily_user");
    if (!userStr) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    setCurrentUser(user);

    if (user.role !== "penjual") {
      navigate("/seller/register");
      return;
    }

    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  }, [navigate]);

  // Mock seller data
  const sellerStats = {
    totalProducts: 24,
    totalRevenue: 4850000,
    totalOrders: 156,
    ratings: 4.8,
  };

  const recentOrders = [
    {
      id: "ORD-001",
      buyer: "Ahmad Rizki",
      product: "Laptop Gaming MSI",
      amount: 350000,
      status: "pending",
      date: "2025-12-08",
    },
    {
      id: "ORD-002",
      buyer: "Bella Kusuma",
      product: "Wireless Earbuds Pro",
      amount: 299000,
      status: "completed",
      date: "2025-12-07",
    },
    {
      id: "ORD-003",
      buyer: "Irfan Pratama",
      product: "USB-C Cable 2M",
      amount: 45000,
      status: "shipped",
      date: "2025-12-06",
    },
    {
      id: "ORD-004",
      buyer: "Siti Rahma",
      product: "Kemeja Denim Vintage",
      amount: 85000,
      status: "pending",
      date: "2025-12-08",
    },
  ];

  const filteredOrders =
    orderFilter === "all"
      ? recentOrders
      : recentOrders.filter((o) => o.status === orderFilter);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        )
      );
    } else {
      // Add new
      setProducts((prev) => [...prev, { ...productData, views: 0, sales: 0 }]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Toko Saya</h1>
              <p className="text-sm text-gray-600 mt-1">
                Kelola produk dan pesanan Anda
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              ← Kembali
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 -mx-4 px-4 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "products", label: "Produk", icon: Package },
              { id: "orders", label: "Pesanan", icon: ShoppingBag },
              { id: "settings", label: "Pengaturan", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Produk",
                  value: sellerStats.totalProducts,
                  icon: Package,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  label: "Total Penjualan",
                  value: `Rp ${(sellerStats.totalRevenue / 1000000).toFixed(
                    1
                  )}JT`,
                  icon: TrendingUp,
                  color: "bg-green-100 text-green-600",
                },
                {
                  label: "Total Pesanan",
                  value: sellerStats.totalOrders,
                  icon: ShoppingBag,
                  color: "bg-orange-100 text-orange-600",
                },
                {
                  label: "Rating Toko",
                  value: `${sellerStats.ratings}/5`,
                  icon: Eye,
                  color: "bg-yellow-100 text-yellow-600",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}
                    >
                      <Icon size={24} />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Sales Chart */}
            <div className="mb-8">
              <SalesChart data={salesData} />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  Pesanan Terbaru
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        ID Pesanan
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Pembeli
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Produk
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Nominal
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.buyer}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          Rp {order.amount.toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status === "pending"
                              ? "Menunggu"
                              : order.status === "shipped"
                              ? "Dikirim"
                              : "Selesai"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Produk Saya ({products.length})
              </h2>
              <button
                onClick={() => setShowProductModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <Plus size={18} />
                Tambah Produk
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                      >
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="space-y-2 mb-4 pb-4 border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Harga</span>
                        <span className="font-bold text-gray-900">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Stok</span>
                        <span className="font-bold text-gray-900">
                          {product.stock}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Penjualan</span>
                        <span className="font-bold text-green-600">
                          {product.sales}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Dilihat</span>
                        <span className="font-bold text-blue-600">
                          {product.views}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleEditProduct(product)}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Edit Produk
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Pesanan ({filteredOrders.length})
              </h2>

              {/* Order Filter */}
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600" />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu</option>
                  <option value="shipped">Dikirim</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        ID Pesanan
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Pembeli
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Produk
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Nominal
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.buyer}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          Rp {order.amount.toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status === "pending"
                              ? "Menunggu"
                              : order.status === "shipped"
                              ? "Dikirim"
                              : "Selesai"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "settings" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pengaturan Toko
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Toko
                  </label>
                  <input
                    type="text"
                    defaultValue="Unily Official Store"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi Toko
                  </label>
                  <textarea
                    defaultValue="Toko resmi Unily untuk perlengkapan kampus berkualitas"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
