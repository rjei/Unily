import React from 'react';
import ProductCard from '../components/ProductCard';

const ServicesScreen = ({ services, onNavigate }) => (
  <main className="container mx-auto px-4 py-8 max-w-7xl">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">Pusat Jasa Mahasiswa</h1>

    <div className="mb-8 p-6 bg-orange-100 border border-orange-300 rounded-xl flex justify-between items-center">
      <p className='text-lg font-medium text-orange-800'>Butuh jasa desain, tutor, atau proofreading cepat? Temukan pakar kampusmu di sini.</p>
      <button className='bg-orange-500 text-white font-medium py-2 px-6 rounded-full hover:bg-orange-600'>Tawarkan Jasamu</button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {services.map((item, index) => (
        <ProductCard key={item.id} item={item} onClick={() => onNavigate('details', item)} showOfficial={index === 0} />
      ))}
      {services.map((item, index) => (
        <ProductCard key={item.id + 100} item={item} onClick={() => onNavigate('details', item)} showOfficial={false} />
      ))}
    </div>
  </main>
);

export default ServicesScreen;


