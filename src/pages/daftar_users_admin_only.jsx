import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, LogOut } from 'lucide-react';

const AdminUsersPanel = ({ onNavigate, onLogout, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('unily_token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api/users` : '/api/users';
      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 403) {
          setError('Forbidden: Admin access required');
        } else {
          setError('Failed to fetch users');
        }
        return;
      }

      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Yakin ingin menghapus user "${userName}"?`)) return;

    try {
      const token = localStorage.getItem('unily_token');
      const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api/users/${userId}` : `/api/users/${userId}`;
      const res = await fetch(apiUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert('Failed to delete user');
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert(`User "${userName}" deleted successfully`);
    } catch (err) {
      alert(`Error deleting user: ${err.message}`);
    }
  };

  const [editingUser, setEditingUser] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const openEdit = (user) => {
    setEditingUser({ ...user });
  };

  const closeEdit = () => {
    setEditingUser(null);
  };

  const handleEditChange = (field, value) => {
    setEditingUser(prev => ({ ...prev, [field]: value }));
  };

  const submitEdit = async () => {
    if (!editingUser) return;
    setEditLoading(true);
    try {
      const token = localStorage.getItem('unily_token');
      const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api/users/${editingUser.id}` : `/api/users/${editingUser.id}`;
      const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editingUser.name, email: editingUser.email, role: editingUser.role }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || 'Failed to update user');
        return;
      }

      const data = await res.json();
      // update local list
      setUsers(prev => prev.map(u => (u.id === data.user.id ? data.user : u)));
      alert('User updated successfully');
      closeEdit();
    } catch (err) {
      alert(`Error updating user: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col">

      <header className="relative bg-gradient-to-br from-green-700 to-green-400 bg-cover bg-no-repeat bg-bottom-right p-0 overflow-hidden min-h-60">
        <div className="w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
          <h1 className="text-white text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-white text-sm opacity-95">Kelola semua pengguna sistem Unily</p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)",
          }}
        ></div>
      </header>

      <main className="w-full max-w-6xl mx-auto px-6 py-8 flex-1">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Selamat datang,</p>
            <h2 className="text-2xl font-bold text-gray-900">{currentUser?.name || 'Admin'}</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 disabled:opacity-50 transition"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={() => {
                onLogout();
                onNavigate('home');
              }}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>


        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Daftar Pengguna ({users.length} users)
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-gray-600">Tidak ada pengguna</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Terdaftar
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={`border-b border-gray-200 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'penjual'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => openEdit(user)}
                          className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-800 rounded-lg hover:bg-yellow-100 transition text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                        >
                          <Trash2 size={16} />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit modal */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-bold mb-4">Edit User</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700">Nama</label>
                  <input
                    value={editingUser.name || ''}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Email</label>
                  <input
                    value={editingUser.email || ''}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Role</label>
                  <select
                    value={editingUser.role || 'pelanggan'}
                    onChange={(e) => handleEditChange('role', e.target.value)}
                    className="w-full border border-gray-200 rounded px-3 py-2 mt-1"
                  >
                    <option value="pelanggan">pelanggan</option>
                    <option value="penjual">penjual</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeEdit}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={submitEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={editLoading}
                >
                  {editLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← Kembali ke Home
          </button>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-600 mt-auto">
        <div className="w-full max-w-6xl mx-auto px-6">
          <small>© 2025 UNILY - Admin Panel</small>
        </div>
      </footer>
    </div>
  );
};

export default AdminUsersPanel;
