// Sales Analytics Chart Component
import React from "react";
import { TrendingUp, TrendingDown, DollarSign, Package } from "lucide-react";

const SalesChart = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  const metrics = {
    totalSales: data.reduce((sum, d) => sum + d.value, 0),
    avgSales: Math.round(
      data.reduce((sum, d) => sum + d.value, 0) / data.length
    ),
    growth: 12.5, // Mock growth percentage
    topDay: data.reduce((max, d) => (d.value > max.value ? d : max)),
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Grafik Penjualan (7 Hari)
        </h3>
        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
          <TrendingUp size={16} />+{metrics.growth}%
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-green-600" />
            <span className="text-xs text-green-700 font-medium">
              Total Penjualan
            </span>
          </div>
          <p className="text-xl font-bold text-green-900">
            Rp {(metrics.totalSales / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">Rata-rata</span>
          </div>
          <p className="text-xl font-bold text-blue-900">
            Rp {(metrics.avgSales / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package size={16} className="text-purple-600" />
            <span className="text-xs text-purple-700 font-medium">
              Hari Terbaik
            </span>
          </div>
          <p className="text-xl font-bold text-purple-900">
            {metrics.topDay.label}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const isMax = item.value === maxValue;

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-medium">{item.label}</span>
                <span className="font-bold text-gray-900">
                  Rp {(item.value / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isMax
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-green-400 to-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Data diperbarui otomatis setiap 1 jam
      </p>
    </div>
  );
};

export default SalesChart;
