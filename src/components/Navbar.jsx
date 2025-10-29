import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = ({ currentUser, onNavigate, cart, showCart, setShowCart }) => (
  <nav className="bg-white p-4 shadow-md sticky top-0 z-20">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Unily" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold text-gray-800">Unily</span>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-[oklch(0.4_0.15_140)]"><Search size={22} /></button>
        <div className="relative cart-dropdown">
          <button 
            onClick={() => setShowCart(!showCart)} 
            className="text-gray-600 hover:text-[oklch(0.4_0.15_140)] relative"
          >
            <Bell size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          {showCart && (
            <div className="absolute right-0 top-8 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Keranjang & Notifikasi</h3>
              </div>
              {cart.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">Keranjang kosong</div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.checkoutDate}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          item.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {currentUser ? (
          <button onClick={() => onNavigate('profile')} className="bg-[oklch(0.4_0.15_140)] text-white px-4 py-2 rounded-full font-medium hover:bg-[oklch(0.35_0.15_140)] transition-colors flex items-center">
            <User size={20} className="mr-2"/> Profil
          </button>
        ) : (
          <button onClick={() => onNavigate('auth')} className="bg-[oklch(0.4_0.15_140)] text-white px-4 py-2 rounded-full font-medium hover:bg-[oklch(0.35_0.15_140)] transition-colors flex items-center">
            <User size={20} className="mr-2"/> Login / Sign Up
          </button>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;


