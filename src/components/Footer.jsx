import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white p-8 mt-12">
    <div className="container mx-auto">
      <div className='flex justify-between flex-wrap'>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h3 className='font-bold text-xl mb-3 flex items-center'><img src="/logo.png" alt="Unily" className="h-8 w-8 mr-2 object-contain"/> Unily</h3>
          <p className='text-sm text-gray-400'>Platform sewa, jual-beli barang, dan jasa skill eksklusif untuk komunitas USU.</p>
        </div>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h3 className='font-semibold text-lg mb-3'>Informasi</h3>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li><a href="#" className='hover:text-[oklch(0.6_0.15_140)]'>Pusat Bantuan</a></li>
            <li><a href="#" className='hover:text-[oklch(0.6_0.15_140)]'>Syarat & Ketentuan</a></li>
            <li><a href="#" className='hover:text-[oklch(0.6_0.15_140)]'>Kebijakan Privasi</a></li>
          </ul>
        </div>
        <div className='w-full md:w-1/3'>
          <h3 className='font-semibold text-lg mb-3'>Layanan Kami</h3>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li><a href="#" className='hover:text-[oklch(0.6_0.15_140)]'>Marketplace & Sewa</a></li>
            <li><a href="#" className='hover:text-[oklch(0.6_0.15_140)]'>Services Hub (Jasa)</a></li>
            <li><a href="#" className='hover:text-[oklch(0.6_0.15_140)]'>Affiliated Business</a></li>
          </ul>
        </div>
      </div>
      <div className='border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500'>
        <p>© 2025 Unily. Hak Cipta Dilindungi.</p>
      </div>
    </div>
  </footer>
);

export default Footer;


