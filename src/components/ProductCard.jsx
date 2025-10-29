import React from 'react';
import { MapPin, Star } from 'lucide-react';

const ProductCard = ({ item, onClick, showOfficial = false }) => (
  <div 
    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    onClick={onClick}
  >
    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm relative">
      Gambar {item.type}
      <span className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full ${item.type === 'Item' ? 'bg-[oklch(0.4_0.15_140)] text-white' : 'bg-orange-500 text-white'}`}>
        {item.type === 'Item' ? 'Barang Fisik' : 'Jasa/Skill'}
      </span>
      {showOfficial && <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Official</span>}
      {item.isRented && item.type === 'Item' && (
        <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Disewa</span>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate text-gray-800">{item.name}</h3>
      <p className="text-xl font-bold text-[oklch(0.4_0.15_140)] mt-1">
        Rp {item.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/{item.unit}</span>
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
        <span className="flex items-center text-yellow-500"><Star size={14} fill="currentColor"/> {item.rating}</span>
        <span className="flex items-center"><MapPin size={14}/> {item.location}</span>
      </div>
    </div>
  </div>
);

export default ProductCard;


