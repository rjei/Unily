import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Shield,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import { showSuccess, showWarning } from "../../utils/alertUtils";

const AdminUsersPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "08123456789",
      joinDate: "2024-11-15",
      isSeller: false,
      status: "active",
      verified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "08987654321",
      joinDate: "2024-10-20",
      isSeller: true,
      status: "active",
      verified: true,
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "08556677889",
      joinDate: "2024-12-01",
      isSeller: false,
      status: "pending",
      verified: false,
    },
  ]);

  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Premium Store",
      email: "seller1@example.com",
      storeName: "Premium Shop",
      rating: 4.8,
      totalProducts: 156,
      totalOrders: 324,
      joinDate: "2024-09-15",
      status: "verified",
      revenue: "Rp 45.2 Juta",
    },
    {
      id: 2,
      name: "Digital Goods",
      email: "seller2@example.com",
      storeName: "Digital Store",
      rating: 4.5,
      totalProducts: 89,
      totalOrders: 156,
      joinDate: "2024-10-10",
      status: "verified",
      revenue: "Rp 12.5 Juta",
    },
    {
      id: 3,
      name: "New Seller",
      email: "newseller@example.com",
      storeName: "New Shop",
      rating: 0,
      totalProducts: 5,
      totalOrders: 0,
      joinDate: "2024-12-01",
      status: "pending",
      revenue: "Rp 0",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    showSuccess("User Deleted", "User has been removed from the system");
  };

  const handleVerifySeller = (id) => {
    setSellers(
      sellers.map((s) => (s.id === id ? { ...s, status: "verified" } : s))
    );
    showSuccess("Seller Verified", "Seller has been verified successfully");
  };

  const handleRejectSeller = (id) => {
    setSellers(sellers.filter((s) => s.id !== id));
    showSuccess("Seller Rejected", "Seller application has been rejected");
  };

  const handleBanUser = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "banned" } : u)));
    showWarning("User Banned", "User has been banned from the platform");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage users and sellers</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-green-600">{users.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "users"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("sellers")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "sellers"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Sellers ({sellers.length})
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.isSeller ? (
                        <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Seller
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "banned"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleBanUser(user.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        <X size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sellers Table */}
        {activeTab === "sellers" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Store Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {seller.storeName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {seller.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {seller.rating > 0 ? `${seller.rating} ⭐` : "New"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {seller.totalProducts}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {seller.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {seller.revenue}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {seller.status === "verified" ? (
                        <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                          <Check size={12} /> Verified
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                          <AlertCircle size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      {seller.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleVerifySeller(seller.id)}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleRejectSeller(seller.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                      {seller.status === "verified" && (
                        <button
                          onClick={() => handleRejectSeller(seller.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          <Shield size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
