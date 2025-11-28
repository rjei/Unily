import { useState } from "react";

function daftar_seller({ onNavigate = () => {} }) {
  const [view, setView] = useState("home"); // 'home' | 'signin' | 'dashboard'
  const [authTab, setAuthTab] = useState("signin"); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [items, setItems] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [dashboardTab, setDashboardTab] = useState("list"); // 'list' | 'add'

  const showHome = view === "home";
  const showSignIn = view === "signin";
  const showDashboard = view === "dashboard";

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Web Hero Section */}
      <header
        className="relative bg-gradient-to-br from-green-700 to-green-400 bg-cover bg-no-repeat bg-bottom-right p-0 overflow-hidden min-h-80"
        style={{
          backgroundImage:
            "url('/mascot-bear.png'), linear-gradient(135deg, #2E7D32 0%, #43A047 100%)",
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-6 py-16 relative z-10">
          {showHome && (
            <>
              <h1 className="text-white text-3xl font-bold mb-2 text-center">
                Mulai Jual Barang Sekarang!
              </h1>
              <p className="text-white text-sm text-center opacity-95">
                Nikmati Keuntungan Penjual dengan menjual barang sendiri
              </p>
            </>
          )}
          {showSignIn && (
            <>
              <h1 className="text-white text-3xl font-bold mb-2 text-center">
                Masuk ke Akun
              </h1>
              <p className="text-white text-sm text-center opacity-95">
                Silakan masuk untuk mulai berjualan
              </p>
            </>
          )}
          {showDashboard && (
            <>
              <h1 className="text-white text-3xl font-bold mb-2 text-center">
                Dashboard Penjual
              </h1>
              <p className="text-white text-sm text-center opacity-95">
                Tambah barang yang ingin dijual
              </p>
            </>
          )}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)",
          }}
        ></div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto px-6 relative z-20 -mt-12 pb-12 flex-1">
        {showHome && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="7"
                    width="16"
                    height="10"
                    rx="1"
                    fill="#2E7D32"
                  />
                  <rect x="4" y="9" width="12" height="6" fill="white" />
                  <circle cx="7" cy="12" r="1.5" fill="#2E7D32" />
                  <circle cx="17" cy="12" r="1.5" fill="#2E7D32" />
                  <path
                    d="M6 7L8 4H16L18 7"
                    stroke="#2E7D32"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Penghasilan Tambahan
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Anda bisa mendapat penghasilan sampingan sebagai penjual
                  dengan menjual barang Anda
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6"
                    y="4"
                    width="12"
                    height="16"
                    rx="2"
                    fill="#2E7D32"
                  />
                  <rect x="8" y="6" width="8" height="10" rx="1" fill="white" />
                  <path
                    d="M10 10H14M10 13H14M10 16H12"
                    stroke="#2E7D32"
                    strokeWidth="1.5"
                  />
                  <path d="M12 2V6M12 18V22" stroke="#2E7D32" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Membantu Mengurangi Limbah
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Secara tidak langsung anda membantu mengurangi limbah dengan
                  menjual barang bekas Anda
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="#2E7D32"
                    strokeWidth="2"
                    fill="white"
                  />
                  <path
                    d="M12 4V8M12 16V20M4 12H8M16 12H20"
                    stroke="#2E7D32"
                    strokeWidth="2"
                  />
                  <path
                    d="M6.343 6.343L9.172 9.172M14.828 14.828L17.657 17.657M6.343 17.657L9.172 14.828M14.828 9.172L17.657 6.343"
                    stroke="#2E7D32"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 2V4M12 20V22M2 12H4M20 12H22"
                    stroke="#2E7D32"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Promosi seuniversitas
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mempromosikan barang anda disini bisa membuat mahasiswa lain
                  melihat barang yang anda jual
                </p>
              </div>
            </div>
          </div>
        )}

        {showSignIn && (
          <div className="flex justify-center py-6">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Main Container */}
              <div className="grid grid-cols-2 gap-0 min-h-[500px]">
                {/* Left Section - QR Code */}
                <div className="bg-gray-50 flex flex-col items-center justify-center p-12">
                  <h3 className="text-center text-lg font-semibold text-gray-900 mb-8">
                    Scan QR Code
                  </h3>

                  {/* QR Code Placeholder */}
                  <div className="w-40 h-40 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-6">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-32 h-32"
                      fill="currentColor"
                    >
                      <rect
                        x="10"
                        y="10"
                        width="30"
                        height="30"
                        className="text-gray-800"
                      />
                      <rect
                        x="50"
                        y="10"
                        width="30"
                        height="30"
                        className="text-gray-800"
                      />
                      <rect
                        x="10"
                        y="50"
                        width="30"
                        height="30"
                        className="text-gray-800"
                      />
                      <rect
                        x="20"
                        y="20"
                        width="10"
                        height="10"
                        className="text-white"
                      />
                      <rect
                        x="60"
                        y="20"
                        width="10"
                        height="10"
                        className="text-white"
                      />
                      <rect
                        x="20"
                        y="60"
                        width="10"
                        height="10"
                        className="text-white"
                      />
                      <circle
                        cx="70"
                        cy="70"
                        r="15"
                        className="text-gray-300"
                      />
                    </svg>
                  </div>

                  <p className="text-center text-sm text-gray-600">
                    Buka aplikasi Unily
                  </p>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Scan untuk login lebih cepat
                  </p>

                  <button className="mt-8 text-sm text-green-700 hover:text-green-800 font-medium">
                    Bagaimana cara scan?
                  </button>
                </div>

                {/* Right Section - Login Form */}
                <div className="flex flex-col p-12">
                  {/* Tabs */}
                  <div className="flex gap-8 mb-8 border-b border-gray-200 pb-4">
                    <button
                      onClick={() => setAuthTab("signin")}
                      className={`text-base font-medium pb-2 border-b-2 transition-colors ${
                        authTab === "signin"
                          ? "text-orange-500 border-orange-500"
                          : "text-gray-600 border-transparent hover:text-gray-900"
                      }`}
                    >
                      Masuk
                    </button>
                    <button
                      onClick={() => setAuthTab("signup")}
                      className={`text-base font-medium pb-2 border-b-2 transition-colors ${
                        authTab === "signup"
                          ? "text-orange-500 border-orange-500"
                          : "text-gray-600 border-transparent hover:text-gray-900"
                      }`}
                    >
                      Daftar
                    </button>
                  </div>

                  {/* Login Form */}
                  {authTab === "signin" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target;
                        const emailInput = form.querySelector("#signin-email");
                        const passwordInput =
                          form.querySelector("#signin-password");
                        const emailValue = emailInput.value.trim();

                        if (!emailValue.endsWith(".ac.id")) {
                          emailInput.setCustomValidity(
                            "Email harus berakhiran .ac.id (contoh: nama@usu.ac.id)"
                          );
                          emailInput.reportValidity();
                          return;
                        }
                        emailInput.setCustomValidity("");

                        if (!passwordInput.value) {
                          passwordInput.setCustomValidity(
                            "Kata sandi wajib diisi"
                          );
                          passwordInput.reportValidity();
                          return;
                        }
                        passwordInput.setCustomValidity("");
                        setView("dashboard");
                        setDashboardTab("add");
                      }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-4">
                        <input
                          id="signin-email"
                          type="email"
                          placeholder="Email/Nomor Telepon"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <div className="relative">
                          <input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Kata Sandi"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword((v) => !v)}
                          >
                            {showPassword ? "🙈" : "👁"}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors mb-4"
                      >
                        Masuk
                      </button>

                      <div className="flex items-center gap-2 mb-4">
                        <input
                          type="checkbox"
                          id="remember"
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm text-gray-600 cursor-pointer"
                        >
                          Ingat Saya
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="text-sm text-orange-500 hover:text-orange-600"
                        >
                          Lupa Kata Sandi?
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Signup Form */}
                  {authTab === "signup" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target;
                        const nameInput = form.querySelector("#signup-name");
                        const emailInput = form.querySelector("#signup-email");
                        const passwordInput =
                          form.querySelector("#signup-password");
                        const confirmInput =
                          form.querySelector("#signup-confirm");

                        if (!nameInput.value.trim()) {
                          nameInput.setCustomValidity("Nama wajib diisi");
                          nameInput.reportValidity();
                          return;
                        }

                        const emailValue = emailInput.value.trim();
                        if (!emailValue.endsWith(".ac.id")) {
                          emailInput.setCustomValidity(
                            "Email harus berakhiran .ac.id (contoh: nama@usu.ac.id)"
                          );
                          emailInput.reportValidity();
                          return;
                        }
                        emailInput.setCustomValidity("");

                        if (!passwordInput.value) {
                          passwordInput.setCustomValidity(
                            "Kata sandi wajib diisi"
                          );
                          passwordInput.reportValidity();
                          return;
                        }

                        if (passwordInput.value !== confirmInput.value) {
                          confirmInput.setCustomValidity(
                            "Kata sandi tidak cocok"
                          );
                          confirmInput.reportValidity();
                          return;
                        }
                        confirmInput.setCustomValidity("");

                        setView("dashboard");
                        setDashboardTab("add");
                      }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-4">
                        <input
                          id="signup-name"
                          type="text"
                          placeholder="Nama Lengkap"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <input
                          id="signup-email"
                          type="email"
                          placeholder="Email (@usu.ac.id)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <div className="relative">
                          <input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Kata Sandi"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword((v) => !v)}
                          >
                            {showPassword ? "🙈" : "👁"}
                          </button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <input
                          id="signup-confirm"
                          type="password"
                          placeholder="Konfirmasi Kata Sandi"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors mb-4"
                      >
                        Daftar
                      </button>

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-4 h-4 cursor-pointer"
                          required
                        />
                        <label htmlFor="terms" className="cursor-pointer">
                          Saya setuju dengan Syarat & Ketentuan dan Kebijakan
                          Privasi
                        </label>
                      </div>
                    </form>
                  )}
                </div>
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      dashboardTab === "list"
                        ? "bg-green-700 text-white"
                        : "text-gray-700"
                    }`}
                    onClick={() => setDashboardTab("list")}
                  >
                    Daftar Barang
                  </button>
                  <button
                    type="button"
                    className={`ml-2 px-4 py-2 rounded-lg text-sm font-medium ${
                      dashboardTab === "add"
                        ? "bg-green-700 text-white"
                        : "text-gray-700"
                    }`}
                    onClick={() => setDashboardTab("add")}
                  >
                    Tambah Barang
                  </button>
                </div>
                <div />
              </div>

              {dashboardTab === "add" && (
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold">Tambah Barang</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target;
                      const name = form.name.value.trim();
                      const price = form.price.value.trim();
                      const desc = form.description.value.trim();
                      const file = form.photo.files[0];
                      if (!name) return;
                      let imageUrl = null;
                      if (file) {
                        imageUrl = URL.createObjectURL(file);
                      }
                      const newItem = {
                        id: Date.now(),
                        name,
                        price,
                        desc,
                        imageUrl,
                      };
                      setItems((prev) => [newItem, ...prev]);
                      form.reset();
                      setImagePreview(null);
                    }}
                  >
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="name" className="text-sm text-gray-900">
                        Nama Barang
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Contoh: Jaket Almamater"
                        className="px-3.5 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="price" className="text-sm text-gray-900">
                        Harga (Rp)
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="1000"
                        placeholder="50000"
                        className="px-3.5 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <label
                        htmlFor="description"
                        className="text-sm text-gray-900"
                      >
                        Deskripsi
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Kondisi, ukuran, dll"
                        className="px-3.5 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                      ></textarea>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="photo" className="text-sm text-gray-900">
                        Foto Barang
                      </label>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (file) {
                            setImagePreview(URL.createObjectURL(file));
                          } else {
                            setImagePreview(null);
                          }
                        }}
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview barang"
                            className="max-w-full h-auto rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      className="w-full bg-green-700 text-white border-none rounded-lg py-3 px-4 text-base font-semibold cursor-pointer hover:bg-green-800 transition-colors"
                      type="submit"
                    >
                      Tambah
                    </button>
                    <button
                      className="mt-3 w-full bg-transparent border-none text-green-700 cursor-pointer text-sm hover:underline"
                      type="button"
                      onClick={() => setView("home")}
                    >
                      ← Kembali
                    </button>
                  </form>
                </div>
              )}

              {dashboardTab === "list" && (
                <div className="w-full">
                  <h3 className="mb-2 text-lg font-bold">Daftar Barang</h3>
                  {items.length === 0 ? (
                    <p className="text-gray-600">Belum ada barang.</p>
                  ) : (
                    <ul className="list-none p-0 m-0 flex flex-col gap-3">
                      {items.map((it) => (
                        <li
                          key={it.id}
                          className="bg-white border border-gray-200 rounded-2xl p-3"
                        >
                          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                            {it.imageUrl && (
                              <img
                                className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                                src={it.imageUrl}
                                alt={it.name}
                              />
                            )}
                            <strong className="text-gray-900">{it.name}</strong>
                            {it.price && (
                              <span className="text-green-700">
                                Rp {Number(it.price).toLocaleString("id-ID")}
                              </span>
                            )}
                          </div>
                          {it.desc && (
                            <p className="mt-1.5 text-gray-700 text-sm">
                              {it.desc}
                            </p>
                          )}
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
            <button
              className="bg-green-700 text-white border-none rounded-lg px-6 py-3 text-base font-semibold cursor-pointer transition-colors hover:bg-green-800 active:bg-gray-900 whitespace-nowrap"
              onClick={() => onNavigate("seller")}
            >
              Daftar sebagai Penjual
            </button>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-600 mt-auto">
        <div className="w-full max-w-4xl mx-auto px-6">
          <small>© 2025 UNILY</small>
        </div>
      </footer>
    </div>
  );
}

export default daftar_seller;
