import React from 'react';
import { Briefcase, ChevronRight, LayoutList } from 'lucide-react';
import Bulletin from '../components/Bulletin';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ searchText, setSearchText, handleSearch, onNavigate, services, products, bulletin }) => (
  <main className="container mx-auto px-4 py-8 max-w-7xl">
    <div className="text-center mb-16 pt-8 pb-10 bg-white rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
          Sewa dan Jual <span className="text-[oklch(0.4_0.15_140)]">Khusus Kampus</span>
        </h1>
      <p className="text-xl text-gray-600 mb-8">
        Temukan semua kebutuhan fisik (barang) dan skill (jasa) dalam satu tempat terverifikasi.
      </p>
      <div className="w-full max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari kamera, buku, jasa desain, atau tutor intensif..."
            className="w-full pl-14 pr-4 py-4 text-xl border-4 border-[oklch(0.4_0.15_140)] rounded-full focus:outline-none focus:ring-4 focus:ring-[oklch(0.8_0.1_140)] transition-all shadow-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/></svg>
        </div>
      </div>
    </div>

    <Bulletin data={bulletin} />

    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center"><LayoutList size={28} className="mr-3 text-[oklch(0.4_0.15_140)]"/> Barang Sewa & Jual Terpopuler</h2>
        <button onClick={() => onNavigate('home')} className="text-[oklch(0.4_0.15_140)] flex items-center hover:text-[oklch(0.35_0.15_140)] font-medium">
          Lihat Semua Barang <ChevronRight size={18}/>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 3).map(item => (
          <ProductCard key={item.id} item={item} onClick={() => onNavigate('details', item)} showOfficial={true} />
        ))}
      </div>
    </section>

    <div className="mt-16 p-8 bg-[oklch(0.95_0.05_140)] rounded-2xl shadow-inner flex justify-around">
      <div className="text-center">
        <svg className="text-[oklch(0.4_0.15_140)] mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4"/></svg>
        <p className="font-semibold text-gray-700">Terverifikasi Kampus</p>
      </div>
      <div className="text-center">
        <svg className="text-[oklch(0.4_0.15_140)] mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8v8m-4-4h8"/></svg>
        <p className="font-semibold text-gray-700">Hemat Biaya & Waktu</p>
      </div>
      <div className="text-center">
        <svg className="text-[oklch(0.4_0.15_140)] mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        <p className="font-semibold text-gray-700">Chat Langsung In-App</p>
      </div>
    </div>
  </main>
);

export default HomeScreen;


