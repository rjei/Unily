import React, { useState } from "react";
import { Save, Lock, Globe, Mail, Bell, Shield, LogOut } from "lucide-react";
import { showSuccess, showWarning } from "../../utils/alertUtils";

const AdminSettingsPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Unily Marketplace",
    platformEmail: "support@unily.com",
    platformPhone: "+62-812-3456-7890",
    siteUrl: "https://unily.com",
    currency: "IDR",
    language: "Bahasa Indonesia",
  });

  // Commission Settings
  const [commissionSettings, setCommissionSettings] = useState({
    platformCommission: 5,
    transactionFee: 2.5,
    withdrawalFee: 10000,
    minWithdrawal: 50000,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    sellerAlerts: true,
    systemAlerts: true,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enforceStrongPassword: true,
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    showSuccess(
      "Settings Saved",
      "Your settings have been updated successfully"
    );
  };

  const handleChangePassword = () => {
    showWarning("Change Password", "Password change will require verification");
  };

  const handleLogoutAll = () => {
    showSuccess("Logged Out", "All active sessions have been terminated");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage platform settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {[
            { id: "general", label: "General", icon: Globe },
            { id: "commission", label: "Commission", icon: Shield },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              General Settings
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.platformName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        platformName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Email
                  </label>
                  <input
                    type="email"
                    value={generalSettings.platformEmail}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        platformEmail: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Phone
                  </label>
                  <input
                    type="tel"
                    value={generalSettings.platformPhone}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        platformPhone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={generalSettings.siteUrl}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={generalSettings.currency}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        currency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>IDR</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        language: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
              >
                <Save size={20} />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Commission Settings */}
        {activeTab === "commission" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Commission & Fee Settings
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Commission (%)
                  </label>
                  <input
                    type="number"
                    value={commissionSettings.platformCommission}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        platformCommission: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Commission taken from each sale
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Fee (%)
                  </label>
                  <input
                    type="number"
                    value={commissionSettings.transactionFee}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        transactionFee: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Payment processing fee
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Fee (Rp)
                  </label>
                  <input
                    type="number"
                    value={commissionSettings.withdrawalFee}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        withdrawalFee: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Fixed fee per withdrawal
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Withdrawal (Rp)
                  </label>
                  <input
                    type="number"
                    value={commissionSettings.minWithdrawal}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        minWithdrawal: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum amount for withdrawal
                  </p>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
              >
                <Save size={20} />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Notification Settings
            </h2>
            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        [key]: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-green-600 cursor-pointer"
                  />
                  <span className="font-medium text-gray-700">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </label>
              ))}
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium mt-6"
              >
                <Save size={20} />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Security Settings
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: "twoFactorAuth", label: "Two-Factor Authentication" },
                  {
                    key: "enforceStrongPassword",
                    label: "Enforce Strong Password",
                  },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={securitySettings[key]}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          [key]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-green-600 cursor-pointer"
                    />
                    <span className="font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium"
                >
                  <Lock size={20} />
                  Change Password
                </button>
                <button
                  onClick={handleLogoutAll}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 font-medium"
                >
                  <LogOut size={20} />
                  Logout All Sessions
                </button>
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium"
              >
                <Save size={20} />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsPage;
