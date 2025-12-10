import { useCallback } from "react";
import { showError, showSuccess } from "../utils/alertUtils";

export const useMidtrans = () => {
  // Pastikan fallback portnya 4000 (sesuai server.js kamu)
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  const getToken = useCallback(
    async (orderId, grossAmount) => {
      try {
        // 1. Ambil token dari localStorage (konsisten dengan authService)
        const authToken = localStorage.getItem("unily_token");

        if (!authToken) {
          throw new Error("Anda belum login. Silakan login terlebih dahulu.");
        }

        // 2. Ambil data USER dari localStorage
        const userStr = localStorage.getItem("unily_user");
        const user = userStr ? JSON.parse(userStr) : {};

        const userName = user.name || "Customer Unily";
        const userEmail = user.email || "customer@unily.id";
        const userPhone = user.phone || "08123456789";

        const response = await fetch(
          `${API_BASE_URL}/payments/create-transaction`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // 👈 Wajib ada Bearer
            },
            body: JSON.stringify({
              orderId,
              grossAmount,
              customerDetails: {
                firstName: userName,
                email: userEmail,
                phone: userPhone,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          // Handle jika token expired
          if (response.status === 401) {
            throw new Error("Sesi habis. Silakan login ulang.");
          }
          throw new Error(
            errorData.message || "Gagal mengambil token pembayaran"
          );
        }

        const data = await response.json();
        return data.token;
      } catch (error) {
        console.error("Error fetching token:", error);
        showError("Gagal Memulai Pembayaran", error.message);
        return null;
      }
    },
    [API_BASE_URL]
  );

  const pay = useCallback((token, onSuccess, onPending, onError) => {
    // Cek apakah script Snap sudah terload di index.html
    if (!window.snap) {
      showError(
        "System Error",
        "Midtrans Snap belum siap. Coba refresh halaman."
      );
      return;
    }

    window.snap.pay(token, {
      onSuccess: (result) => {
        showSuccess("Pembayaran Berhasil!", "Pesanan Anda sedang diproses.");
        if (onSuccess) onSuccess(result);
      },
      onPending: (result) => {
        console.log("Payment pending:", result);
        showSuccess(
          "Menunggu Pembayaran",
          "Silakan selesaikan pembayaran Anda."
        );
        if (onPending) onPending(result);
      },
      onError: (result) => {
        showError("Pembayaran Gagal", "Terjadi kesalahan saat pembayaran.");
        if (onError) onError(result);
      },
      onClose: () => {
        console.log("User menutup popup pembayaran");
      },
    });
  }, []);

  const processPayment = useCallback(
    async (orderId, grossAmount, onSuccess, onPending, onError) => {
      const token = await getToken(orderId, grossAmount);
      if (token) {
        pay(token, onSuccess, onPending, onError);
      }
    },
    [getToken, pay]
  );

  return {
    processPayment,
    getToken,
    pay,
  };
};

export default useMidtrans;
