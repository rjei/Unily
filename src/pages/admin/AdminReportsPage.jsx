import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  Download,
} from "lucide-react";
import { showSuccess } from "../../utils/alertUtils";

const AdminReportsPage = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState("month");

  // Sales data for line chart
  const salesData = [
    { date: "1 Des", sales: 2.4, orders: 24 },
    { date: "5 Des", sales: 1.3, orders: 18 },
    { date: "10 Des", sales: 2.8, orders: 32 },
    { date: "15 Des", sales: 3.9, orders: 45 },
    { date: "20 Des", sales: 3.8, orders: 52 },
    { date: "25 Des", sales: 4.5, orders: 67 },
    { date: "31 Des", sales: 5.2, orders: 78 },
  ];

  // Product category distribution
  const categoryData = [
    { name: "Electronics", value: 35, color: "#3b82f6" },
    { name: "Fashion", value: 25, color: "#10b981" },
    { name: "Home", value: 20, color: "#f59e0b" },
    { name: "Books", value: 15, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#6b7280" },
  ];

  // Top sellers
  const topSellers = [
    { name: "Premium Store", sales: "Rp 45.2 Juta", growth: "+23%" },
    { name: "Digital Goods", sales: "Rp 28.5 Juta", growth: "+15%" },
    { name: "Fashion Hub", sales: "Rp 18.9 Juta", growth: "+12%" },
    { name: "Tech World", sales: "Rp 15.4 Juta", growth: "+8%" },
  ];

  // Key metrics
  const metrics = [
    {
      label: "Total Revenue",
      value: "Rp 156.2 Juta",
      icon: DollarSign,
      change: "+18.5%",
      color: "green",
    },
    {
      label: "Total Orders",
      value: "2,547",
      icon: ShoppingCart,
      change: "+12.3%",
      color: "blue",
    },
    {
      label: "Active Sellers",
      value: "342",
      icon: Store,
      change: "+5.2%",
      color: "purple",
    },
    {
      label: "Total Users",
      value: "8,945",
      icon: Users,
      change: "+22.1%",
      color: "orange",
    },
  ];

  const handleExportReport = () => {
    showSuccess("Export Successful", "Report has been exported as PDF");
  };

  const colorMap = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-600">Platform performance insights</p>
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 font-medium"
          >
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className={`${
                  colorMap[metric.color]
                } border rounded-lg p-6 transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium opacity-75">
                    {metric.label}
                  </p>
                  <Icon size={20} />
                </div>
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-xs font-semibold">{metric.change}</p>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales & Orders Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Sales & Orders
              </h2>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  name="Sales (Juta)"
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Sellers */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Top Sellers This Month
          </h2>
          <div className="space-y-3">
            {topSellers.map((seller, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{seller.name}</p>
                    <p className="text-sm text-gray-600">{seller.sales}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <TrendingUp size={18} />
                  {seller.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Platform Statistics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Avg Order Value</span>
                <span className="font-semibold text-gray-900">Rp 245.000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-semibold text-gray-900">8.5%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Avg Seller Rating</span>
                <span className="font-semibold text-gray-900">4.2 ⭐</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Return Rate</span>
                <span className="font-semibold text-gray-900">2.3%</span>
              </div>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Customer Satisfaction
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Very Satisfied",
                  percentage: 65,
                  color: "bg-green-500",
                },
                { label: "Satisfied", percentage: 25, color: "bg-blue-500" },
                { label: "Neutral", percentage: 7, color: "bg-yellow-500" },
                { label: "Unsatisfied", percentage: 3, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
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

export default AdminReportsPage;
