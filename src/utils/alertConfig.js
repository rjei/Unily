import Swal from "sweetalert2";

// Configure SweetAlert2 to display in center
Swal.mixin({
  position: "center",
  didOpen: (modal) => {
    modal.scrollTop = 0;
  },
});

export const showAlert = (options = {}) => {
  return Swal.fire({
    position: "center",
    ...options,
  });
};

export const showSuccess = (title, message) => {
  return showAlert({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#2E7D32",
    confirmButtonText: "OK",
  });
};

export const showError = (title, message) => {
  return showAlert({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#DC2626",
    confirmButtonText: "OK",
  });
};

export const showWarning = (title, message) => {
  return showAlert({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#F59E0B",
    confirmButtonText: "OK",
  });
};

export const showConfirm = (title, message) => {
  return showAlert({
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#2E7D32",
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Ya, Lanjutkan",
    cancelButtonText: "Batal",
  });
};

export const showToast = (icon, title) => {
  return showAlert({
    icon,
    title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });
};
