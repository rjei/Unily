import React, { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Printer,
  Download,
} from "lucide-react";
import { showSuccess, showWarning } from "../../utils/alertUtils";

const AdminOrdersPage = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-001",
      customer: "John Doe",
      seller: "Premium Store",
      amount: "Rp 245.000",
      items: 2,
      status: "delivered",
      date: "2024-12-15",
      paymentMethod: "Bank Transfer",
      trackingNumber: "JNE123456789",
      items_list: ["Product A", "Product B"],
    },
    {
      id: "ORD-2024-002",
      customer: "Jane Smith",
      seller: "Digital Goods",
      amount: "Rp 150.000",
      items: 1,
      status: "in_transit",
      date: "2024-12-14",
      paymentMethod: "E-Wallet",
      trackingNumber: "JNE987654321",
      items_list: ["Product C"],
    },
    {
      id: "ORD-2024-003",
      customer: "Bob Wilson",
      seller: "Fashion Hub",
      amount: "Rp 425.000",
      items: 3,
      status: "pending",
      date: "2024-12-13",
      paymentMethod: "Credit Card",
      trackingNumber: null,
      items_list: ["Product D", "Product E", "Product F"],
    },
    {
      id: "ORD-2024-004",
      customer: "Alice Johnson",
      seller: "Premium Store",
      amount: "Rp 895.000",
      items: 4,
      status: "processing",
      date: "2024-12-12",
      paymentMethod: "Bank Transfer",
      trackingNumber: null,
      items_list: ["Product G", "Product H", "Product I", "Product J"],
    },
    {
      id: "ORD-2024-005",
      customer: "Charlie Brown",
      seller: "Tech World",
      amount: "Rp 1.200.000",
      items: 2,
      status: "cancelled",
      date: "2024-12-11",
      paymentMethod: "E-Wallet",
      trackingNumber: null,
      items_list: ["Product K", "Product L"],
    },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      in_transit: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pending",
      processing: "Processing",
      in_transit: "In Transit",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    return labels[status] || status;
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showSuccess(
      "Order Updated",
      `Order status changed to ${getStatusLabel(newStatus)}`
    );
    setSelectedOrder(null);
  };

  const handlePrintLabel = (orderId) => {
    showSuccess("Print Label", "Shipping label has been sent to printer");
  };

  const handleDownloadInvoice = (orderId) => {
    showSuccess("Download Invoice", "Invoice has been downloaded successfully");
  };

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "In Transit",
      value: orders.filter((o) => o.status === "in_transit").length,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "delivered").length,
      color: "bg-green-50 text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-600">View and manage all platform orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} border rounded-lg p-4`}>
              <p className="text-sm font-medium opacity-75">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by order ID, customer, or seller..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.seller}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedOrder.id}
                  </h2>
                  <p className="text-gray-600 text-sm">Order Details</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Customer
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.customer}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Seller
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.seller}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Amount
                    </p>
                    <p className="text-gray-900 font-medium text-lg">
                      {selectedOrder.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Payment Method
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Items
                  </p>
                  <ul className="space-y-2">
                    {selectedOrder.items_list.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status & Tracking */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Current Status
                      </p>
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          Tracking Number
                        </p>
                        <p className="text-gray-900 font-mono">
                          {selectedOrder.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Update */}
                {selectedOrder.status !== "delivered" &&
                  selectedOrder.status !== "cancelled" && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">
                        Update Status
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["processing", "in_transit", "delivered"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() =>
                                handleUpdateStatus(selectedOrder.id, status)
                              }
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                selectedOrder.status === status
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {getStatusLabel(status)}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4 flex gap-3">
                  <button
                    onClick={() => handlePrintLabel(selectedOrder.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                  >
                    <Printer size={16} />
                    Print Label
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(selectedOrder.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium text-sm"
                  >
                    <Download size={16} />
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
