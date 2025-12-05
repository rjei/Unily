import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const defaultForm = {
  name: "",
  price: "",
  unit: "jam",
  location: "",
  desc: "",
};

const AddServiceModal = ({
  formData,
  onChange,
  onClose,
  onSubmit,
  isSubmitting,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Tambah Jasa</h2>
          <p className="text-sm text-gray-500">
            Cantumkan detail jasamu agar mudah ditemukan mahasiswa lain.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Tutup
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Nama Jasa
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Tarif
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              min="0"
              name="price"
              value={formData.price}
              onChange={onChange}
              required
              className="w-1/2 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={onChange}
              className="w-1/2 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Alamat
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            required
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Deskripsi
          <textarea
            name="desc"
            value={formData.desc}
            onChange={onChange}
            rows={4}
            required
            className="mt-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Jasa"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const ServicesScreen = ({ services, onNavigate, onAddService }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddService?.({
        ...formData,
      });
      setFormData(defaultForm);
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter to show only first 4 services with official tag
  const displayedServices = services.slice(0, 4);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Pusat Jasa Mahasiswa
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {displayedServices.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onClick={() => onNavigate("details", item)}
            showOfficial={true}
          />
        ))}
      </div>

      {showForm && (
        <AddServiceModal
          formData={formData}
          onChange={handleChange}
          onClose={() => {
            setShowForm(false);
            setFormData(defaultForm);
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </main>
  );
};

export default ServicesScreen;
