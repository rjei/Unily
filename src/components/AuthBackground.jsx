import React from "react";

const AuthBackground = ({ isLogin }) => {
  return (
    <>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-students-studying-together-in-a-library-4895-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 ${
          isLogin
            ? "bg-linear-to-r from-[oklch(0.5_0.18_40)]/70 via-black/50 to-[oklch(0.4_0.15_140)]/70"
            : "bg-linear-to-r from-[oklch(0.4_0.15_140)]/70 via-black/50 to-[oklch(0.5_0.18_40)]/70"
        }`}
      />

      {/* Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </>
  );
};

export default AuthBackground;
