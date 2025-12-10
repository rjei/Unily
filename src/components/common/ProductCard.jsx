import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Heart, CheckCircle } from "lucide-react";

const ProductCard = ({ item, onClick, showOfficial = false }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!item) return null;

  const isService = item.type === "sewa" || item.type === "Service";
  const rating = item.rating || 4.5;
  const location = item.location || "USU";
  const sellerName = item.seller?.name || item.seller || "Toko";

  // Check wishlist status from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("unily_wishlist") || "[]");
    setIsWishlisted(wishlist.includes(item.id));
  }, [item.id]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("unily_wishlist") || "[]");

    if (isWishlisted) {
      const newWishlist = wishlist.filter((id) => id !== item.id);
      localStorage.setItem("unily_wishlist", JSON.stringify(newWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(item.id);
      localStorage.setItem("unily_wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${item.name}, Harga Rp ${(item.price || 0).toLocaleString(
        "id-ID"
      )}, Rating ${rating}`}
      className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col focus:outline-none focus:ring-2 focus:ring-[oklch(0.4_0.15_140)] focus:ring-offset-2 ${
        isService
          ? "transform hover:-translate-y-2"
          : "transform hover:-translate-y-1"
      }`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image Container */}
      <div className="w-full h-64 bg-gray-100 relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
          style={{ display: item.image ? "none" : "flex" }}
          aria-label="Gambar tidak tersedia"
        >
          📦 Gambar {item.type}
        </div>

        {/* Badge Type */}
        <span
          className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
            item.type === "Item" || !isService
              ? "bg-[oklch(0.4_0.15_140)] text-white"
              : "bg-orange-500 text-white"
          }`}
          aria-label={
            item.type === "Item" || !isService
              ? "Barang Fisik"
              : "Jasa atau Skill"
          }
        >
          {item.type === "Item" || !isService ? "Barang Fisik" : "Jasa/Skill"}
        </span>

        {/* Resmi Badge */}
        {(showOfficial ||
          item.official ||
          item.sellerDetail?.badge === "Resmi") && (
          <span
            className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1"
            aria-label="Toko resmi"
          >
            <CheckCircle size={14} aria-hidden="true" /> Resmi
          </span>
        )}

        {/* Rented Badge */}
        {item.isRented && (item.type === "Item" || !isService) && (
          <span
            className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm"
            aria-label="Sedang disewa"
          >
            Disewa
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute bottom-2 right-2 p-2 rounded-full shadow-lg transition-all duration-200 ${
            isWishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          aria-label={
            isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"
          }
        >
          <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 grow flex flex-col">
        {/* Seller Info */}
        {sellerName && (
          <div
            className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const sellerId = item.seller?.id || item.sellerId || 1;
              navigate(`/seller/${sellerId}`);
            }}
          >
            <div className="w-6 h-6 rounded-full bg-[oklch(0.4_0.15_140)] flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0">
              {item.seller?.avatar ? (
                <img
                  src={item.seller.avatar}
                  alt={`Avatar ${sellerName}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                sellerName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">
                {sellerName}
              </p>
            </div>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-base font-semibold line-clamp-2 text-gray-800 mb-2 min-h-12">
          {item.name}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold text-[oklch(0.4_0.15_140)] mb-2">
          Rp {(item.price || 0).toLocaleString("id-ID")}{" "}
          <span className="text-xs font-normal text-gray-500">
            /{item.unit || "pcs"}
          </span>
        </p>

        {/* Rating and Location */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2 border-t border-gray-50">
          <span
            className="flex items-center gap-1"
            aria-label={`Rating ${rating} dari 5`}
          >
            <Star
              size={14}
              className="text-yellow-400 fill-yellow-400"
              aria-hidden="true"
            />
            <span className="text-gray-700 font-medium">{rating}</span>
          </span>
          <span
            className="flex items-center gap-1 text-gray-600"
            aria-label={`Lokasi: ${location}`}
          >
            <MapPin size={14} aria-hidden="true" /> {location}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
