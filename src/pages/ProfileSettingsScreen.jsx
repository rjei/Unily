import React, { useState } from "react";
import {
  User,
  MapPin,
  CreditCard,
  Building2,
  Bell,
  Shield,
  ChevronRight,
} from "lucide-react";

const ProfileSettingsScreen = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState("biodata");

  const tabs = [
    { id: "biodata", label: "Biodata Diri", icon: User },
    { id: "alamat", label: "Daftar Alamat", icon: MapPin },
    { id: "pembayaran", label: "Pembayaran", icon: CreditCard },
    { id: "rekening", label: "Rekening Bank", icon: Building2 },
    { id: "notifikasi", label: "Notifikasi", icon: Bell },
    { id: "keamanan", label: "Keamanan", icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "biodata":
        return (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ubah Biodata Diri
              </h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center relative">
                    <span className="text-white text-3xl font-bold">
                      {currentUser?.name?.charAt(0) || "U"}
                    </span>
                    {currentUser?.isSeller && (
                      <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-white">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {currentUser?.isSeller && (
                    <span className="text-xs font-semibold text-green-600 mt-2 bg-green-100 px-2.5 py-0.5 rounded-full">
                      Seller Terverifikasi
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <button className="px-4 py-2 border border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] rounded-lg hover:bg-[oklch(0.4_0.15_140)]/5 font-medium text-sm">
                    Pilih Foto
                  </button>
                  {!currentUser?.isSeller && (
                    <button
                      onClick={() => onNavigate("seller-register")}
                      className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                    >
                      Mulai Berjualan
                    </button>
                  )}
                  {currentUser?.isSeller && (
                    <button
                      onClick={() => onNavigate("seller-dashboard")}
                      className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-sm"
                    >
                      Kelola Toko
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  defaultValue={currentUser?.name || "Art"}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20 focus:border-[oklch(0.4_0.15_140)]"
                />
                <button className="mt-2 text-sm text-[oklch(0.4_0.15_140)] font-medium hover:underline">
                  Ubah
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Lahir
                </label>
                <div className="flex gap-2">
                  <select className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20">
                    <option>Pilih Tanggal</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20">
                    <option>Pilih Bulan</option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mei",
                      "Jun",
                      "Jul",
                      "Ags",
                      "Sep",
                      "Okt",
                      "Nov",
                      "Des",
                    ].map((month, idx) => (
                      <option key={idx} value={idx + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)]/20">
                    <option>Pilih Tahun</option>
                    {Array.from({ length: 50 }, (_, i) => 2025 - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <button className="mt-2 text-sm text-[oklch(0.4_0.15_140)] font-medium hover:underline">
                  Tambah Tanggal Lahir
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kelamin
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      className="text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
                    />
                    <span className="text-sm text-gray-700">Laki-laki</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      className="text-[oklch(0.4_0.15_140)] focus:ring-[oklch(0.4_0.15_140)]"
                    />
                    <span className="text-sm text-gray-700">Perempuan</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "alamat":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Daftar Alamat
              </h3>
              <button className="px-4 py-2 bg-[oklch(0.4_0.15_140)] text-white rounded-lg hover:opacity-90 font-medium text-sm">
                + Tambah Alamat Baru
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-500">
              Belum ada alamat tersimpan
            </div>
          </div>
        );

      case "pembayaran":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Pembayaran
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">GoPay</p>
                    <p className="text-xs text-gray-500">Aktifkan</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-600 to-green-800 flex items-center justify-center">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Unily Card</p>
                    <p className="text-xs text-gray-500">Daftar</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        );

      case "rekening":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Rekening Bank
              </h3>
              <button className="px-4 py-2 bg-[oklch(0.4_0.15_140)] text-white rounded-lg hover:opacity-90 font-medium text-sm">
                + Tambah Rekening
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-500">
              Belum ada rekening tersimpan
            </div>
          </div>
        );

      case "notifikasi":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Pengaturan Notifikasi
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Promo & Penawaran",
                  desc: "Dapatkan info promo terbaru",
                },
                {
                  label: "Update Transaksi",
                  desc: "Status pesanan & pengiriman",
                },
                { label: "Chat & Pesan", desc: "Pesan dari penjual" },
                { label: "Ulasan & Rating", desc: "Pengingat untuk review" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.4_0.15_140)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.4_0.15_140)]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "keamanan":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Keamanan Akun
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">
                    {currentUser?.email || "magrie@gmail.com"}
                  </p>
                  <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Terverifikasi
                  </span>
                </div>
                <button className="text-sm text-[oklch(0.4_0.15_140)] font-medium hover:underline">
                  Ubah
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">Nomor HP</p>
                  <p className="text-sm text-gray-500">Tambah Nomor HP</p>
                </div>
                <button className="text-sm text-[oklch(0.4_0.15_140)] font-medium hover:underline">
                  Tambah
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">PIN Unily</p>
                  <p className="text-sm text-gray-500">Buat PIN Tokopedia</p>
                </div>
                <button className="text-sm text-[oklch(0.4_0.15_140)] font-medium hover:underline">
                  Buat PIN
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">Verifikasi Instan</p>
                  <p className="text-sm text-gray-500">
                    Verifikasi dengan scan QR atau email
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate("home")}
            className="text-sm text-gray-600 hover:text-[oklch(0.4_0.15_140)] mb-2"
          >
            ← Kembali ke Beranda
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-gray-100 last:border-b-0 ${
                    activeTab === tab.id
                      ? "bg-[oklch(0.4_0.15_140)]/5 text-[oklch(0.4_0.15_140)] font-semibold border-l-4 border-l-[oklch(0.4_0.15_140)]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSettingsScreen;
