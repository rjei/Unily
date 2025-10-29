import React from 'react';
import { Briefcase, LayoutList } from 'lucide-react';

const PrimaryNav = ({ currentPage, onNavigate }) => (
  <div className="relative flex justify-center bg-white border-b border-gray-100 shadow-sm sticky top-16 z-10">
    <button onClick={() => onNavigate('auth')} className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[oklch(0.4_0.15_140)] hover:text-[oklch(0.35_0.15_140)]">Daftar Jadi Seller</button>
    <div className="flex space-x-10 text-lg font-medium">
      <button onClick={() => onNavigate('home')} className={`py-3 px-6 transition-all duration-300 ${currentPage === 'home' ? 'text-[oklch(0.4_0.15_140)] border-b-4 border-[oklch(0.4_0.15_140)]' : 'text-gray-600 hover:text-[oklch(0.4_0.15_140)]'}`}>
        <LayoutList size={20} className="inline-block mr-2" /> Marketplace & Borrowing
      </button>
      <button onClick={() => onNavigate('services')} className={`py-3 px-6 transition-all duration-300 ${currentPage === 'services' ? 'text-orange-500 border-b-4 border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
        <Briefcase size={20} className="inline-block mr-2" /> Services Hub
      </button>
    </div>
  </div>
);

export default PrimaryNav;


