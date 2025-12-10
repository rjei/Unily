import React from "react";
import HeroSlider from "../components/home/HeroSlider";
import HomeProductGrid from "../components/home/HomeProductGrid";

const HomeScreen = () => {
  return (
    <main className="w-full bg-white">
      {/* Komponen Hero Slider (Beruang & Animasi) */}
      <HeroSlider />

      {/* Komponen Grid Produk */}
      <HomeProductGrid />
    </main>
  );
};

export default HomeScreen;