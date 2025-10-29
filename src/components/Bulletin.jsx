import React from 'react';

const Bulletin = ({ data }) => (
  <div className={`w-full p-8 rounded-2xl ${data.color} text-white shadow-2xl mb-12`}>
    <div className="flex items-center justify-between flex-wrap">
      <div className='flex items-center'>
        <span className="text-5xl mr-5">{data.icon}</span>
        <div>
          <h2 className="text-3xl font-bold">{data.title}</h2>
          <p className="text-lg mt-1 text-gray-100 max-w-xl">{data.subtitle}</p>
        </div>
      </div>
      <button className="bg-white text-red-600 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-colors mt-4 md:mt-0">
        {data.cta}
      </button>
    </div>
  </div>
);

export default Bulletin;


