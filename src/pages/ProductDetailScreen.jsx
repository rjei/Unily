import React from 'react';
import { ChevronLeft, Star } from 'lucide-react';

const ProductDetailScreen = ({ selectedItem, onNavigate, onCheckout }) => {
  if (!selectedItem) return null;
  const isService = selectedItem.type === 'Service';

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <button onClick={() => onNavigate(isService ? 'services' : 'home')} className="mb-6 text-gray-600 flex items-center hover:text-[oklch(0.4_0.15_140)]">
        <ChevronLeft size={20} className="mr-1" /> Kembali ke {isService ? 'Jasa' : 'Marketplace'}
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl rounded-xl mb-6">
            Gambar {selectedItem.type}
          </div>
          <h2 className="text-4xl font-bold text-gray-900">{selectedItem.name}</h2>
          <p className="text-2xl font-bold text-[oklch(0.4_0.15_140)] mt-2">
            Rp {selectedItem.price.toLocaleString('id-ID')} <span className="text-base font-normal text-gray-500">/{selectedItem.unit}</span>
          </p>
          <div className="flex items-center text-yellow-500 mt-4">
            <Star size={24} fill="currentColor"/>
            <span className="ml-1 text-xl font-semibold">{selectedItem.rating}</span>
            <span className="text-gray-500 ml-2 text-sm">(Lihat 95 Ulasan)</span>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            {selectedItem.desc} Unily menjamin transaksi aman.
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-lg border ${isService ? 'border-orange-300' : 'border-[oklch(0.6_0.15_140)]'}`}>
          <h3 className="text-2xl font-bold mb-4">{isService ? 'Pesan Jasa Ini' : 'Sewa/Beli Barang'}</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Pilih Durasi / Kuantitas</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[oklch(0.4_0.15_140)] focus:border-[oklch(0.4_0.15_140)]">
              <option>1 {selectedItem.unit} (Rp {selectedItem.price.toLocaleString('id-ID')})</option>
              <option>2 {selectedItem.unit} (Rp {(selectedItem.price * 2).toLocaleString('id-ID')})</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Metode Transaksi</label>
            <div className="flex space-x-4">
              <button className={`flex-1 p-3 border rounded-lg ${!isService ? 'border-[oklch(0.4_0.15_140)] bg-[oklch(0.95_0.05_140)]' : 'border-gray-300'}`}>Sewa Harian</button>
              <button className={`flex-1 p-3 border rounded-lg ${!isService ? 'border-gray-300' : 'border-orange-500 bg-orange-50'}`}>Jual Beli</button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-xl text-gray-700">Total Biaya:</span>
            <span className="text-3xl font-bold text-orange-500">Rp {selectedItem.price.toLocaleString('id-ID')}</span>
          </div>
          <button 
            className={`w-full font-bold py-3 rounded-full text-lg mt-4 shadow-lg ${isService ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[oklch(0.4_0.15_140)] hover:bg-[oklch(0.35_0.15_140)]'} text-white transition-colors`}
            onClick={() => onCheckout(selectedItem)}
          >
            Bayar Sekarang 
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailScreen;


