import Swal from "sweetalert2";

// 1. Definisikan Style 
const defaultStyles = {
  popup: "rounded-2xl shadow-xl border border-gray-100 p-6",
  title: "text-xl font-bold text-gray-800 mb-1",
  htmlContainer: "text-gray-600 text-sm",
  confirmButton: "bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition duration-200 shadow-sm mx-2",
  cancelButton: "bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition duration-200 shadow-sm mx-2",
};

// 2. Buat Mixin
const cleanSwal = Swal.mixin({
  customClass: defaultStyles,
  buttonsStyling: false,
  reverseButtons: true,
  focusConfirm: false,
});

// 3. Toast Configuration
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    popup: "rounded-xl shadow-lg border border-gray-100 flex items-center p-3",
    title: "text-sm font-medium text-gray-800 ml-2",
  },
});

// --- EXPORT FUNCTIONS ---

export const showSuccess = (title, message = "") => {
  return cleanSwal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonText: "Mantap! 👍",
    customClass: {
      ...defaultStyles, // ✅ Panggil variable langsung, bukan cleanSwal.params
      confirmButton: "bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-sm",
    }
  });
};

export const showError = (title, message = "") => {
  return cleanSwal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonText: "Tutup",
    customClass: {
      ...defaultStyles, // ✅ Panggil variable langsung
      confirmButton: "bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-sm",
    }
  });
};

export const showWarning = (title, message = "") => {
  return cleanSwal.fire({
    icon: "warning",
    title: title,
    text: message,
    confirmButtonText: "Mengerti",
  });
};

export const showConfirm = (title, message = "", confirmText = "Ya, Lanjutkan") => {
  return cleanSwal.fire({
    icon: "question",
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Batal",
  });
};

export const showToast = (icon, title) => {
  return Toast.fire({
    icon: icon,
    title: title,
  });
};

// Default export
export default {
  showSuccess,
  showError,
  showWarning,
  showConfirm,
  showToast,
};