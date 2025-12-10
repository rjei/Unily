import React from "react";
import { Star, MapPin, Award, Heart } from "lucide-react";

const SellerProfile = ({ seller = {}, onFollowClick = () => {} }) => {
  const sellerInfo = {
    name: seller.name || "Seller Unknown",
    verified: seller.verified || false,
    badge: seller.badge || null,
    rating: seller.rating || 4.8,
    followers: seller.followers || 0,
    products: seller.products || 0,
    location: seller.location || "Indonesia",
    description: seller.description || "Premium seller",
    profileImage:
      seller.image ||
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop",
    joinDate: seller.joinDate || new Date().toISOString().split("T")[0],
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with profile image and info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="shrink-0">
            <img
              src={sellerInfo.profileImage}
              alt={sellerInfo.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
            />
          </div>

          {/* Seller Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {sellerInfo.name}
              </h3>
              {sellerInfo.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  <Award size={12} />
                  {sellerInfo.badge}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <MapPin size={14} />
              <span>{sellerInfo.location}</span>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={
                        i < Math.floor(sellerInfo.rating)
                          ? "currentColor"
                          : "none"
                      }
                      className="text-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {sellerInfo.rating}
                </span>
              </div>

              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded">
                {sellerInfo.followers.toLocaleString("id-ID")} followers
              </span>
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <button
          onClick={onFollowClick}
          className="px-4 py-2 rounded-lg border-2 border-[oklch(0.4_0.15_140)] text-[oklch(0.4_0.15_140)] font-semibold hover:bg-[oklch(0.4_0.15_140)]/10 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Heart size={16} />
          <span className="hidden sm:inline">Follow</span>
        </button>
      </div>

      {/* Seller Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {sellerInfo.description}
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">
            {sellerInfo.products}
          </p>
          <p className="text-xs text-gray-600">Produk</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">
            {sellerInfo.followers.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-gray-600">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">
            {Math.floor(Math.random() * 100)}%
          </p>
          <p className="text-xs text-gray-600">Respon Cepat</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
        <button className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm">
          Lihat Toko
        </button>
        <button className="px-4 py-2 rounded-lg bg-[oklch(0.4_0.15_140)] text-white font-semibold hover:bg-[oklch(0.35_0.15_140)] transition-colors text-sm">
          Chat Penjual
        </button>
      </div>
    </div>
  );
};

export default SellerProfile;
