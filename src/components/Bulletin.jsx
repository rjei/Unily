import React, { useEffect, useState } from "react";

const bulletins = [
  {
    title: "Sewa dan Jual Khusus Kampus",
    subtitle:
      "Temukan semua kebutuhan fisik (barang) dan skill (jasa) dalam satu tempat terverifikasi.",
    color: "bg-white text-green-800 border-2 border-green-700",
    icon: (
      <svg
        width="48"
        height="48"
        fill="none"
        stroke="green"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    cta: null,
    search: false,
  },
  {
    title: "UNILY STUDY: Siap Tempur UTS/UAS?",
    subtitle:
      "Dapatkan mentor terbaik dari fakultasmu. Daftar sekarang untuk les intensif!",
    color: "bg-gradient-to-r from-orange-500 to-orange-400 text-white",
    icon: (
      <span role="img" aria-label="brain" style={{ fontSize: "2.5rem" }}>
        🧠
      </span>
    ),
    cta: "Daftar Les Intensif",
    ctaLink: "#les-intensif",
    search: false,
  },
];

const Bulletin = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % bulletins.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const b = bulletins[active];

  return (
    <div className="w-full flex flex-col items-center mb-12">
      <div
        className={`w-full p-8 rounded-2xl shadow-2xl transition-all duration-700 ${b.color}`}
        style={{ minHeight: 120 }}
      >
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <span className="text-5xl mr-5">{b.icon}</span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{b.title}</h2>
              <p className="text-lg md:text-xl mb-2">{b.subtitle}</p>
            </div>
          </div>
          {/* Tidak ada search box, hanya banner/picture style */}
          {b.cta && (
            <a
              href={b.ctaLink}
              className="ml-0 md:ml-8 mt-4 md:mt-0 px-6 py-3 rounded-full bg-white text-red-600 font-bold text-lg shadow hover:bg-red-50 transition"
            >
              {b.cta}
            </a>
          )}
        </div>
      </div>
      <div className="flex space-x-3 mt-4">
        {bulletins.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setActive(idx)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              active === idx
                ? "bg-white border-2 border-orange-500"
                : "bg-orange-300"
            } cursor-pointer`}
            style={{ display: "inline-block" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Bulletin;
