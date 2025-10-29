import React from 'react';

const ProfileScreen = ({ user, onNavigate, onLogout }) => {
  if (!user) return null;
  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Profil</h1>
        <div className="space-y-3 text-gray-700">
          <div><span className="font-semibold">Nama:</span> {user.name || 'Pengguna'}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
        </div>
        <div className="mt-8 flex gap-3">
          <button onClick={() => onNavigate('home')} className="px-5 py-2 rounded-lg bg-[oklch(0.4_0.15_140)] text-white hover:bg-[oklch(0.35_0.15_140)]">Kembali Belanja</button>
          <button onClick={onLogout} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Logout</button>
        </div>
      </div>
    </main>
  );
};

export default ProfileScreen;


