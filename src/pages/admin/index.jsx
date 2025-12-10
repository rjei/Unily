import React, { useState } from "react";
import {
  Users,
  Store,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AdminDashboard = ({ onNavigate }) => {
  const [stats] = useState([
    {
      label: "Total Revenue",
      value: "Rp 156.2 Juta",
      change: "+18.5%",
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Total Orders",
      value: "2,547",
      change: "+12.3%",
      icon: ShoppingCart,
      color: "blue",
    },
    {
      label: "Active Sellers",
      value: "342",
      change: "+5.2%",
      icon: Store,
      color: "purple",
    },
    {
      label: "Total Users",
      value: "8,945",
      change: "+22.1%",
      icon: Users,
      color: "orange",
    },
  ]);

  const [recentOrders] = useState([
    {
      id: "ORD-2024-001",
      customer: "John Doe",
      amount: "Rp 245.000",
      status: "delivered",
      date: "2024-12-15",
    },
    {
      id: "ORD-2024-002",
      customer: "Jane Smith",
      amount: "Rp 150.000",
      status: "in_transit",
      date: "2024-12-14",
    },
    {
      id: "ORD-2024-003",
      customer: "Bob Wilson",
      amount: "Rp 425.000",
      status: "pending",
      date: "2024-12-13",
    },
    {
      id: "ORD-2024-004",
      customer: "Alice Johnson",
      amount: "Rp 895.000",
      status: "processing",
      date: "2024-12-12",
    },
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "5 Pending Seller Verifications",
      message: "There are 5 sellers awaiting verification review",
      icon: AlertCircle,
    },
    {
      id: 2,
      type: "info",
      title: "System Update Available",
      message: "A new security patch is available for installation",
      icon: Clock,
    },
    {
      id: 3,
      type: "error",
      title: "3 Disputed Orders",
      message: "3 orders need your attention for dispute resolution",
      icon: XCircle,
    },
  ]);

  const colorMap = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };

  const alertColorMap = {
    warning: "border-l-4 border-yellow-400 bg-yellow-50",
    info: "border-l-4 border-blue-400 bg-blue-50",
    error: "border-l-4 border-red-400 bg-red-50",
  };

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const quickActions = [
    {
      label: "Manage Users",
      icon: Users,
      action: () => handleNavigate("admin-users"),
      color: "bg-blue-500",
    },
    {
      label: "View Orders",
      icon: ShoppingCart,
      action: () => handleNavigate("admin-orders"),
      color: "bg-green-500",
    },
    {
      label: "Seller Verification",
      icon: Store,
      action: () => handleNavigate("admin-users"),
      color: "bg-purple-500",
    },
    {
      label: "Analytics",
      icon: TrendingUp,
      action: () => handleNavigate("admin-reports"),
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening on your platform.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${
                  colorMap[stat.color]
                } border rounded-lg p-6 transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium opacity-75">{stat.label}</p>
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs font-semibold">
                  {stat.change} this month
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white rounded-lg p-4 hover:shadow-lg transition-all flex flex-col items-center gap-2 text-center`}
              >
                <Icon size={28} />
                <span className="font-semibold text-sm">{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <button
                onClick={() => handleNavigate("admin-orders")}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => {
                const statusColors = {
                  delivered: "bg-green-100 text-green-800",
                  in_transit: "bg-purple-100 text-purple-800",
                  pending: "bg-yellow-100 text-yellow-800",
                  processing: "bg-blue-100 text-blue-800",
                };

                const statusLabels = {
                  delivered: "Delivered",
                  in_transit: "In Transit",
                  pending: "Pending",
                  processing: "Processing",
                };

                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {order.amount}
                      </p>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Alerts & Notifications
            </h2>

            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className={`${alertColorMap[alert.type]} rounded-lg p-4`}
                  >
                    <div className="flex gap-3">
                      <Icon size={20} className="shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {alert.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => handleNavigate("admin-users")}
              className="w-full mt-6 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
            >
              Review Alerts
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* System Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              System Status
            </h2>
            <div className="space-y-3">
              {[
                { name: "API Server", status: "online", uptime: "99.9%" },
                { name: "Database", status: "online", uptime: "99.8%" },
                { name: "Payment Gateway", status: "online", uptime: "99.99%" },
                { name: "Email Service", status: "online", uptime: "99.7%" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-semibold text-green-600">
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Quick Stats
            </h2>
            <div className="space-y-4">
              {[
                { label: "Avg Order Value", value: "Rp 245.000", icon: "💰" },
                { label: "Conversion Rate", value: "8.5%", icon: "📊" },
                {
                  label: "Customer Satisfaction",
                  value: "4.5/5.0",
                  icon: "⭐",
                },
                {
                  label: "Avg Processing Time",
                  value: "2.4 hours",
                  icon: "⏱️",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
