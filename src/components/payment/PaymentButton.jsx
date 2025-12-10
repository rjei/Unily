import React, { useState } from "react";
import { CreditCard, Loader, AlertCircle } from "lucide-react";
import useMidtrans from "../../hooks/useMidtrans";

/**
 * Reusable Payment Button Component
 * Integrates with Midtrans Snap for secure payment processing
 */
const PaymentButton = ({
  orderId,
  grossAmount,
  onPaymentSuccess,
  onPaymentPending,
  onPaymentError,
  buttonText = "Bayar Sekarang",
  disabled = false,
  className = "",
  variant = "primary",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { processPayment } = useMidtrans();

  const handlePaymentClick = async () => {
    // Clear previous errors
    setError(null);

    // Validate required params
    if (!orderId || !grossAmount) {
      const errorMsg = "Data pembayaran tidak lengkap";
      setError(errorMsg);
      console.error("Missing orderId or grossAmount");
      if (onPaymentError) onPaymentError({ message: errorMsg });
      return;
    }

    setIsLoading(true);

    try {
      await processPayment(
        orderId,
        grossAmount,
        (result) => {
          // Success callback
          setIsLoading(false);
          setError(null);
          if (onPaymentSuccess) onPaymentSuccess(result);
        },
        (result) => {
          // Pending callback
          setIsLoading(false);
          setError(null);
          console.log("Payment pending:", result);
          if (onPaymentPending) onPaymentPending(result);
        },
        (error) => {
          // Error callback
          setIsLoading(false);
          const errorMsg = error?.message || "Pembayaran gagal";
          setError(errorMsg);
          console.error("Payment error:", error);
          if (onPaymentError) onPaymentError(error);
        }
      );
    } catch (err) {
      // Catch any unexpected errors
      setIsLoading(false);
      const errorMsg = err?.message || "Terjadi kesalahan tidak terduga";
      setError(errorMsg);
      console.error("Unexpected payment error:", err);
      if (onPaymentError) onPaymentError(err);
    }
  };

  const baseStyles =
    "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handlePaymentClick}
        disabled={isLoading || disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        aria-label="Process payment"
      >
        {isLoading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            {buttonText}
          </>
        )}
      </button>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
