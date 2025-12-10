import React from "react";
import { MessageCircle, User, Clock, CheckCheck } from "lucide-react";

const MessagesDropdown = ({ onClose }) => {
  // Mock data messages
  const messages = [
    {
      id: 1,
      sender: "Toko Elektronik Budi",
      message: "Laptop masih ready kak, bisa langsung COD",
      time: "5 menit lalu",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    {
      id: 2,
      sender: "Koperasi Mahasiswa",
      message: "Terima kasih sudah berbelanja!",
      time: "2 jam lalu",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    {
      id: 3,
      sender: "Jasa Tutor Matematika",
      message: "Jadwal les besok jam berapa kak?",
      time: "1 hari lalu",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
      {/* Header */}
      <div className="bg-linear-to-r from-[oklch(0.45_0.15_140)] to-[oklch(0.35_0.15_140)] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} className="text-white" />
            <h3 className="text-lg font-bold text-white">Pesan</h3>
          </div>
          <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full">
            {messages.filter((m) => m.unread).length} baru
          </span>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="py-12 text-center">
            <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Belum ada pesan</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`px-5 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                msg.unread ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  {msg.avatar ? (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                  )}
                  {msg.unread && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`text-sm font-semibold text-gray-900 truncate ${
                        msg.unread ? "font-bold" : ""
                      }`}
                    >
                      {msg.sender}
                    </h4>
                    {msg.unread && (
                      <CheckCheck
                        size={14}
                        className="text-gray-400 shrink-0 ml-2"
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm text-gray-600 line-clamp-2 mb-1 ${
                      msg.unread ? "font-medium" : ""
                    }`}
                  >
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
        <button className="w-full text-center text-sm font-semibold text-[oklch(0.4_0.15_140)] hover:text-[oklch(0.35_0.15_140)] transition-colors py-2">
          Lihat Semua Pesan
        </button>
      </div>
    </div>
  );
};

export default MessagesDropdown;
