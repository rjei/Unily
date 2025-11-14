import React from "react";
import { X } from "lucide-react";

const BulletinPopup = ({ data, isOpen, onClose }) => {
  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ backgroundColor: "rgba(30, 32, 37, 0.25)" }}
    >
      {/* Container untuk Bulletin + Close Button */}
      <div className="relative flex flex-col items-center">
        {/* Bulletin Card - Kecil dan bisa diklik */}
        <div
          className={`text-white rounded-2xl shadow-2xl w-full max-w-sm p-8 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 duration-300 backdrop-blur-md border border-white border-opacity-40`}
          style={{
            background: `linear-gradient(135deg, rgba(255, 140, 0, 0.25) 0%, rgba(255, 100, 0, 0.15) 100%)`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={() => {
            
            console.log("Bulletin diklik");
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-5xl">{data.icon}</span>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{data.title}</h2>
              <p className="text-sm text-gray-100">{data.subtitle}</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full font-bold py-2 px-4 rounded-full transition-all duration-300 backdrop-blur-md border-2 border-white bg-white bg-opacity-20 text-orange-400 hover:bg-opacity-30 hover:border-opacity-100 cursor-pointer">
            {data.cta}
          </button>
        </div>

        {/* Cancel Button - Di bawah bulletin */}
        <button
          onClick={onClose}
          className="mt-4 rounded-full p-3 transition-all duration-300 border-2 border-white hover:border-opacity-100 flex items-center justify-center"
          title="Tutup"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <X size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default BulletinPopup;
