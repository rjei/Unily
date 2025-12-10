import React from "react";
import { Instagram, Youtube } from "lucide-react";

// X (Twitter) icon component since lucide doesn't have the new X logo
const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// TikTok icon component
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-gray-50/50 border-t border-gray-100 pt-12 pb-6 px-12 mt-16">
    <div className="container mx-auto px-4">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Column 1 - Unily Info */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
            <img
              src="/logo.png"
              alt="Unily"
              className="h-7 w-7 mr-2 object-contain"
            />
            Unily
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Platform sewa, jual-beli barang, dan jasa skill eksklusif untuk
            komunitas USU.
          </p>
        </div>

        {/* Column 2 - Informasi */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-gray-900">
            Informasi
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pusat Bantuan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Syarat & Ketentuan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Jual & Beli */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-gray-900">
            Jual & Beli
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pusat Edukasi Seller
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Daftar Jadi Seller
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Layanan Kami */}
        <div>
          <h4 className="font-semibold text-sm mb-3 text-gray-900">
            Layanan Kami
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Marketplace, Sewa & Pinjam
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pusat Layanan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Affiliated Business
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">
              Ikuti Kami:
            </span>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="X (Twitter)"
            >
              <XIcon size={18} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-pink-600 transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="TikTok"
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-300">|</span>
            <p>©2025 Unily, All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
