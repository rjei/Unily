import { useState } from 'react'
import { Menu, X, LogOut, Plus, Edit, Trash2, Search, User, Mail, Phone, MapPin } from 'lucide-react'

function Seller({ onNavigate = () => {} }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [accountData, setAccountData] = useState({
    name: 'John Doe',
    email: 'john@usu.ac.id',
    phone: '08123456789',
    address: 'Jl. Merdeka No. 123',
    city: 'Medan', 
    province: 'Sumatera Utara',
    postal: '20123'
  })
  const [editingAccount, setEditingAccount] = useState(false)
  const [tempAccountData, setTempAccountData] = useState(accountData)
  const [items, setItems] = useState([
    { id: 1, image: '📦', name: 'Jaket Almamater', price: 120000, stock: 4, category: 'Pakaian', date: '05/10/2025', status: 'Aktif' },
    { id: 2, image: '📷', name: 'Kamera DSLR Canon 700D', price: 100000, stock: 2, category: 'Elektronik', date: '03/10/2025', status: 'Aktif' },
    { id: 3, image: '💻', name: 'Laptop ASUS Vivobook 14"', price: 30000, stock: 1, category: 'Elektronik', date: '01/10/2025', status: 'Aktif' },
    { id: 4, image: '🔊', name: 'Speaker Portable JBL Go 3', price: 15000, stock: 3, category: 'Audio', date: '01/10/2025', status: 'Terjual' },
  ])
  const [formData, setFormData] = useState({ image: '', name: '', price: '', stock: '', category: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAddItem = (e) => {
    e.preventDefault()
    if (formData.name && formData.category) {
      const newItem = {
        id: Date.now(),
        image: formData.image || '📦',
        name: formData.name,
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        category: formData.category,
        date: new Date().toLocaleDateString('id-ID'),
        status: 'Aktif'
      }
      setItems([newItem, ...items])
      setFormData({ image: '', name: '', price: '', stock: '', category: '' })
    }
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveAccount = () => {
    setAccountData(tempAccountData)
    setEditingAccount(false)
  }

  // --- Sales data and monthly calculations (mock data) ---
  const daysAgo = (d) => { const dt = new Date(); dt.setDate(dt.getDate() - d); return dt.toISOString(); }
  const [sales, setSales] = useState([
    { id: 101, date: daysAgo(2), amount: 150000, itemsSold: 3 },
    { id: 102, date: daysAgo(7), amount: 75000, itemsSold: 1 },
    { id: 103, date: daysAgo(10), amount: 220000, itemsSold: 5 },
    { id: 104, date: daysAgo(18), amount: 90000, itemsSold: 2 },
    { id: 105, date: daysAgo(35), amount: 50000, itemsSold: 1 } // older than 30 days
  ])

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  const monthlySales = sales.filter(s => new Date(s.date) >= oneMonthAgo);
  const totalRevenue = monthlySales.reduce((sum, s) => sum + (s.amount || 0), 0);
  const totalItemsSold = monthlySales.reduce((sum, s) => sum + (s.itemsSold || 0), 0);

  const sectionTitle = currentSection === 'dashboard' ? 'Dashboard' : currentSection === 'daftar_barang' ? 'Daftar Barang' : (currentSection.charAt(0).toUpperCase() + currentSection.slice(1))

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-green-900 text-white transition-all duration-300 overflow-y-auto`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>UNILY</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-green-800 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'daftar_barang', label: 'Daftar Barang', icon: '🛍️' },
            { id: 'pesanan', label: 'Pesanan', icon: '🛒' },
            { id: 'settings', label: 'Pengaturan Akun', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'settings') {
                  setShowAccountModal(true)
                  setTempAccountData(accountData)
                } else {
                  setCurrentSection(item.id)
                }
              }}
              className={`w-full px-6 py-3 text-left flex items-center gap-3 hover:bg-green-800 transition-colors ${
                currentSection === item.id && item.id !== 'settings' ? 'bg-green-800 border-l-4 border-white' : ''
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={!sidebarOpen ? 'hidden' : ''}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Back to Buyer Dashboard Button */}
        <div className="px-4 py-3 border-t border-green-700">
          <button
            onClick={() => onNavigate('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-green-700 rounded transition-colors text-sm font-medium ${!sidebarOpen && 'justify-center'}`}
          >
            <span className="text-lg">←</span>
            {sidebarOpen && <span>Kembali ke Dashboard Pembeli</span>}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-green-900 to-green-800 border-t border-green-700">
          {/* User Profile Section */}
          <button
            onClick={() => {
              setShowAccountModal(true)
              setTempAccountData(accountData)
            }}
            className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-green-700 transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg font-bold text-white">
              {accountData.name.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="text-sm text-left flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{accountData.name}</p>
                <p className="text-xs text-green-100 truncate">{accountData.email}</p>
              </div>
            )}
          </button>

          {/* Logout Button */}
          <div className={`px-4 py-3 border-t border-green-700 ${!sidebarOpen && 'flex justify-center'}`}>
            <button
              onClick={() => onNavigate('home')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-red-200 hover:text-red-100 hover:bg-red-700 hover:bg-opacity-30 rounded transition-colors text-sm ${!sidebarOpen && 'justify-center'}`}
            >
              <LogOut size={18} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Akun Saya</h2>
            
            {!editingAccount ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <p className="font-semibold text-gray-800">{accountData.name}</p>
                    <p className="text-sm text-gray-600">{accountData.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <Mail size={18} className="text-green-600 mt-1" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-medium text-gray-800">{accountData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <Phone size={18} className="text-green-600 mt-1" />
                    <div>
                      <p className="text-xs text-gray-600">Nomor Telepon</p>
                      <p className="text-sm font-medium text-gray-800">{accountData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <MapPin size={18} className="text-green-600 mt-1" />
                    <div>
                      <p className="text-xs text-gray-600">Alamat</p>
                      <p className="text-sm font-medium text-gray-800">{accountData.address}</p>
                      <p className="text-sm font-medium text-gray-800">{accountData.city}, {accountData.province} {accountData.postal}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setEditingAccount(true)
                      setTempAccountData(accountData)
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-semibold"
                  >
                    Edit Akun
                  </button>
                  <button
                    onClick={() => setShowAccountModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveAccount() }} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={tempAccountData.name}
                    onChange={(e) => setTempAccountData({ ...tempAccountData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={tempAccountData.email}
                    onChange={(e) => setTempAccountData({ ...tempAccountData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                  <input
                    type="tel"
                    placeholder="Nomor Telepon"
                    value={tempAccountData.phone}
                    onChange={(e) => setTempAccountData({ ...tempAccountData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <input
                    type="text"
                    placeholder="Alamat"
                    value={tempAccountData.address}
                    onChange={(e) => setTempAccountData({ ...tempAccountData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-semibold"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAccount(false)
                      setTempAccountData(accountData)
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Tambah Barang Baru</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">Tutup</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddItem(e); setShowAddModal(false); }} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emoji atau Icon</label>
                <input type="text" placeholder="📦" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
                  <input type="text" placeholder="Nama Barang" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <input type="number" placeholder="50000" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input type="number" placeholder="Stok" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <input type="text" placeholder="Kategori" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">Tambah</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">{sectionTitle}</h2>
          <div className="flex items-center gap-4">
            {(currentSection === 'daftar_barang' || currentSection === 'pesanan') && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari nama atau kategori..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            {currentSection === 'daftar_barang' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="hidden md:inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold"
              >
                <Plus size={16} />
                Tambah Barang
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {currentSection === 'dashboard' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Pendapatan 30 Hari</p>
                  <p className="text-2xl font-bold text-green-700">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500">Total Barang Terjual (30 Hari)</p>
                  <p className="text-2xl font-bold text-green-700">{totalItemsSold}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-3">Penjualan Terbaru (30 hari)</h3>
                <ul className="divide-y divide-gray-100">
                  {monthlySales.length > 0 ? (
                    monthlySales.map(s => (
                      <li key={s.id} className="py-3 flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Order #{s.id}</p>
                          <p className="text-xs text-gray-500">{new Date(s.date).toLocaleString('id-ID')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">Rp {s.amount.toLocaleString('id-ID')}</p>
                          <p className="text-xs text-gray-500">{s.itemsSold} barang</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="py-6 text-center text-gray-500">Belum ada penjualan dalam 30 hari terakhir</li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Mobile Search Bar */}
              {(currentSection === 'daftar_barang' || currentSection === 'pesanan') && (
                <div className="md:hidden mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Cari barang..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Add-item UI removed per request */}

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gambar</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Harga</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stok</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-2xl">{item.image}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Rp {Number(item.price).toLocaleString('id-ID')}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{item.stock}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                            <td className="px-6 py-4 text-sm flex gap-2">
                              <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors" title="Edit">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors" title="Hapus"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                            Tidak ada barang yang ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Empty State */}
              {items.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <p className="text-gray-500 text-lg mb-4">Belum ada barang yang ditambahkan</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Seller