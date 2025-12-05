import { useState, useRef, useEffect } from 'react'

function daftar_seller({ onNavigate = () => {} }) {
  const [view, setView] = useState('home')
  const [showPassword, setShowPassword] = useState(false)
  const [items, setItems] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [dashboardTab, setDashboardTab] = useState('list')
  const [showMascotWave, setShowMascotWave] = useState(false)
  const videoRef = useRef(null)
  const [playCount, setPlayCount] = useState(0)
  
  const showHome = view === 'home'
  const showSignIn = view === 'signin'
  const showDashboard = view === 'dashboard' 

  const handleRegisterClick = () => {
    setPlayCount(0)
    setShowMascotWave(true)
  }

  useEffect(() => {
    if (showMascotWave) {
      // try to play when modal opens
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play().catch(() => {})
        }
      }, 50)
    }
  }, [showMascotWave])

  const handleVideoEnd = () => {
    setPlayCount((prev) => {
      const next = prev + 1
      if (next >= 5) {
        setShowMascotWave(false)
        onNavigate('seller')
      } else {
        // replay
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play().catch(() => {})
        }
      }
      return next
    })
  }

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Tombol Kembali di kiri atas */}
      <button
        className="absolute top-4 left-4 bg-white border border-gray-300 rounded-lg px-4 py-2 text-green-700 font-semibold shadow hover:bg-green-50 transition z-50"
        onClick={() => onNavigate('home')}
      >
        ← Kembali
      </button>

      {/* Web Hero Section */}
      <header className="relative bg-gradient-to-br from-green-700 to-green-500 p-0 overflow-hidden min-h-80">
        <div className="w-full max-w-4xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center justify-center h-full">
          {showHome && (
            <>
              <h1 className="text-white text-4xl font-bold mb-4 text-center drop-shadow-lg">Mulai Jual Barang Sekarang!</h1>
              <p className="text-white text-base text-center opacity-100 drop-shadow-md max-w-md">Nikmati Keuntungan Penjual dengan menjual barang sendiri</p>
            </>
          )}
          {showSignIn && (
            <>
              <h1 className="text-white text-4xl font-bold mb-4 text-center drop-shadow-lg">Masuk ke Akun</h1>
              <p className="text-white text-base text-center opacity-100 drop-shadow-md max-w-md">Silakan masuk untuk mulai berjualan</p>
            </>
          )}
          {showDashboard && (
            <>
              <h1 className="text-white text-4xl font-bold mb-4 text-center drop-shadow-lg">Dashboard Penjual</h1>
              <p className="text-white text-base text-center opacity-100 drop-shadow-md max-w-md">Tambah barang yang ingin dijual</p>
            </>
          )}
        </div>
        {/* Decorative pattern at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
        <img 
            src="/mascot.png" 
            alt="Mascot Kiri" 
            className="absolute left-0 bottom-0 h-full w-auto object-contain transform -translate-x-1/4 hidden md:block z-0 opacity-80" 
        />

         <img 
            src="/mascot.png" 
            alt="Mascot Kanan" 
            className="absolute right-0 bottom-0 h-full w-auto object-contain transform translate-x-1/4 hidden md:block z-0 opacity-80" 
            style={{ transform: 'scaleX(-1) translate(25%, 0)' }}
        />
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto px-6 relative z-20 -mt-12 pb-12 flex-1">
        {showHome && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="7" width="16" height="10" rx="1" fill="#2E7D32"/>
                  <rect x="4" y="9" width="12" height="6" fill="white"/>
                  <circle cx="7" cy="12" r="1.5" fill="#2E7D32"/>
                  <circle cx="17" cy="12" r="1.5" fill="#2E7D32"/>
                  <path d="M6 7L8 4H16L18 7" stroke="#2E7D32" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">Penghasilan Tambahan</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Anda bisa mendapat penghasilan sampingan sebagai penjual dengan menjual barang Anda</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="12" height="16" rx="2" fill="#2E7D32"/>
                  <rect x="8" y="6" width="8" height="10" rx="1" fill="white"/>
                  <path d="M10 10H14M10 13H14M10 16H12" stroke="#2E7D32" strokeWidth="1.5"/>
                  <path d="M12 2V6M12 18V22" stroke="#2E7D32" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">Membantu Mengurangi Limbah</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Secara tidak langsung anda membantu mengurangi limbah dengan menjual barang bekas Anda</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="#2E7D32" strokeWidth="2" fill="white"/>
                  <path d="M12 4V8M12 16V20M4 12H8M16 12H20" stroke="#2E7D32" strokeWidth="2"/>
                  <path d="M6.343 6.343L9.172 9.172M14.828 14.828L17.657 17.657M6.343 17.657L9.172 14.828M14.828 9.172L17.657 6.343" stroke="#2E7D32" strokeWidth="1.5"/>
                  <path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke="#2E7D32" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">Promosi seuniversitas</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Mempromosikan barang anda disini bisa membuat mahasiswa lain melihat barang yang anda jual</p>
              </div>
            </div>
          </div>
        )}

        {showDashboard && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-4xl px-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex rounded-lg bg-white border border-gray-200 p-1 shadow-sm">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${dashboardTab === 'list' ? 'bg-green-700 text-white' : 'text-gray-700'}`}
                    onClick={() => setDashboardTab('list')}
                  >
                    Daftar Barang
                  </button>

                </div>
                <div />
              </div>



              {dashboardTab === 'list' && (
                <div className="w-full">
                  <h3 className="mb-2 text-lg font-bold">Daftar Barang</h3>
                  {items.length === 0 ? (
                    <p className="text-gray-600">Belum ada barang.</p>
                  ) : (
                    <ul className="list-none p-0 m-0 flex flex-col gap-3">
                      {items.map((it) => (
                        <li key={it.id} className="bg-white border border-gray-200 rounded-2xl p-3">
                          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                            {it.imageUrl && (
                              <img className="w-14 h-14 object-cover rounded-lg border border-gray-200" src={it.imageUrl} alt={it.name} />
                            )}
                            <strong className="text-gray-900">{it.name}</strong>
                            {it.price && <span className="text-green-700">Rp {Number(it.price).toLocaleString('id-ID')}</span>}
                          </div>
                          {it.desc && <p className="mt-1.5 text-gray-700 text-sm">{it.desc}</p>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

        {showHome && (
        <div className="bg-white py-6 border-t border-gray-200">
          <div className="w-full max-w-4xl mx-auto px-6 flex justify-center">
            <button className="bg-green-700 text-white border-none rounded-lg px-6 py-3 text-base font-semibold cursor-pointer transition-colors hover:bg-green-800 active:bg-gray-900 whitespace-nowrap" onClick={handleRegisterClick}>Daftar sebagai Penjual</button>
          </div>
        </div>
      )}

      {/* Mascot Waving Modal */}
      {showMascotWave && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => {
            setShowMascotWave(false)
            onNavigate('seller')
          }}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex justify-center">
              <video 
                ref={videoRef}
                src="/animasi-halo.mp4" 
                className="w-48 h-48 object-contain rounded-lg cursor-pointer"
                autoPlay
                loop={false}
                muted
                playsInline
                onEnded={handleVideoEnd}
                onClick={() => {
                  setShowMascotWave(false)
                  onNavigate('seller')
                }}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang!</h2>
            <p className="text-gray-600">Terima kasih telah mendaftar sebagai penjual di Unily. Kami siap membantu Anda!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default daftar_seller