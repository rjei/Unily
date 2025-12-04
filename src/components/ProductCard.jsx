import React from "react";
import { MapPin, Star } from "lucide-react";

const ProductCard = ({ item, onClick, showOfficial = false }) => {
  const isService = item.type === "Service";

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col ${
        isService
          ? "transform hover:-translate-y-2"
          : "transform hover:-translate-y-1"
      }`}
      onClick={onClick}
    >
      <div className="w-full h-64 bg-gray-100 relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
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
        >
          Gambar {item.type}
        </div>
        <span
          className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full ${
            item.type === "Item"
              ? "bg-[oklch(0.4_0.15_140)] text-white"
              : "bg-orange-500 text-white"
          }`}
        >
          {item.type === "Item" ? "Barang Fisik" : "Jasa/Skill"}
        </span>
        {showOfficial && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Official
          </span>
        )}
        {item.isRented && item.type === "Item" && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Disewa
          </span>
        )}
      </div>
      <div className="p-4 grow flex flex-col">
        <h3 className="text-base font-semibold truncate text-gray-800 mb-1">
          {item.name}
        </h3>
        <p className="text-lg font-bold text-[oklch(0.4_0.15_140)] mb-2">
          Rp {item.price.toLocaleString("id-ID")}{" "}
          <span className="text-xs font-normal text-gray-500">
            /{item.unit}
          </span>
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <span className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" /> {item.rating}
          </span>
          <span className="flex items-center">
            <MapPin size={14} /> {item.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
