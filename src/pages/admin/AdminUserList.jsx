import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, RefreshCw, LogOut, Edit, ArrowLeft } from "lucide-react";
import { showSuccess, showError } from "../../utils/alertUtils";

const AdminUserList = () => {
  const navigate = useNavigate();

  // State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Form State
  const [editingUser, setEditingUser] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // Config
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  // Load Current User & Users Data
  useEffect(() => {
    const userStr = localStorage.getItem("user_data");
    if (userStr) setCurrentUser(JSON.parse(userStr));
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Sesi habis. Silakan login kembali.");
        return;
      }

      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError("Akses Ditolak: Anda bukan Admin.");
        } else {
          setError("Gagal mengambil data user.");
        }
        return;
      }

      const data = await res.json();

      setUsers(data.users || data || []);
    } catch (err) {
      setError(`Koneksi Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      !window.confirm(
        `⚠️ PERINGATAN: User "${userName}" akan dihapus permanen. Lanjut?`
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Gagal menghapus user");

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showSuccess("Terhapus", `User "${userName}" berhasil dihapus.`);
    } catch (err) {
      showError("Error", err.message);
    }
  };

  // --- EDIT LOGIC ---
  const openEdit = (user) => setEditingUser({ ...user });
  const closeEdit = () => setEditingUser(null);

  const handleEditChange = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  const submitEdit = async () => {
    if (!editingUser) return;
    setEditLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Gagal update user");
      }

      const data = await res.json();
      // Update state lokal
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...editingUser } : u
        )
      );

      showSuccess("Berhasil", "Data user diperbarui!");
      closeEdit();
    } catch (err) {
      showError("Gagal", err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Keluar dari Admin Panel?")) {
      localStorage.clear(); // Bersihkan semua token
      navigate("/auth/login");
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* HEADER */}
      <header className="relative bg-linear-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="w-full max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-300 text-sm">
                Kelola Pengguna & Hak Akses
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Login sebagai:</p>
              <p className="font-semibold text-orange-400">
                {currentUser?.name || "Super Admin"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 -mt-8">
        {/* TOOLBAR */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-medium"
          >
            <ArrowLeft size={18} /> Kembali ke Aplikasi
          </button>

          <div className="flex gap-3">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition font-medium text-sm"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex justify-between items-center">
            <div className="text-red-700 text-sm font-medium">{error}</div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* USER TABLE CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Daftar Pengguna</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              Total: {users.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 mb-2"></div>
                      <p>Memuat data pengguna...</p>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Belum ada data pengguna.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                        #{user.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "penjual"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit User"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Unily Admin Panel. All rights
          reserved.
        </div>
      </footer>

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Edit Data User
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  value={editingUser.name || ""}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  value={editingUser.email || ""}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Akses
                </label>
                <select
                  value={editingUser.role || "pelanggan"}
                  onChange={(e) => handleEditChange("role", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-white"
                >
                  <option value="pelanggan">Pelanggan</option>
                  <option value="penjual">Penjual</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={closeEdit}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
                disabled={editLoading}
              >
                Batal
              </button>
              <button
                onClick={submitEdit}
                className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium shadow-md hover:shadow-lg transition flex items-center gap-2"
                disabled={editLoading}
              >
                {editLoading && (
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                )}
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
