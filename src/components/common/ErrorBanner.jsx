import React from 'react';
import { AlertCircle, XCircle, WifiOff, AlertTriangle, X, ShieldAlert } from 'lucide-react';

/**
 * Inline Error Banner Component
 * Displays error messages inline with contextual styling
 */
const ErrorBanner = ({ error, onDismiss }) => {
  if (!error) return null;

  const getErrorConfig = () => {
    switch (error.type) {
      case 'network':
        return {
          icon: WifiOff,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-800',
          title: 'Koneksi Terputus'
        };
      case 'auth':
        return {
          icon: ShieldAlert,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          iconColor: 'text-orange-600',
          textColor: 'text-orange-800',
          title: 'Autentikasi Gagal'
        };
      case 'conflict':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-800',
          title: 'Data Sudah Ada'
        };
      case 'validation':
        return {
          icon: AlertCircle,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-800',
          title: 'Validasi Gagal'
        };
      default:
        return {
          icon: XCircle,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-800',
          title: 'Terjadi Kesalahan'
        };
    }
  };

  const config = getErrorConfig();
  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`${config.bgColor} ${config.borderColor} border-l-4 p-4 rounded-lg mb-4 animate-fadeIn`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`${config.iconColor} shrink-0 mt-0.5`} size={20} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h4 className={`${config.textColor} font-semibold text-sm mb-1`}>
            {config.title}
          </h4>
          <p className={`${config.textColor} text-sm leading-relaxed`}>
            {error.message}
          </p>
          {error.details && (
            <p className="text-xs text-gray-600 mt-2">
              {error.details}
            </p>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Tutup peringatan"
            className={`${config.textColor} hover:opacity-70 transition-opacity shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded p-1`}
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBanner;