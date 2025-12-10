const userStore = require("../storage/userStore");
const db = require("../db/connection");

// Get current user profile
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  const user = await userStore.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Remove sensitive data
  const { passwordHash, ...userProfile } = user;

  res.json({
    success: true,
    profile: userProfile,
  });
};

// Update profile data
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, birthDate, gender, bio, phone } = req.body;

  try {
    const user = await userStore.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data
    const updatedData = {
      ...user,
      name: name || user.name,
      birthDate: birthDate || user.birthDate,
      gender: gender || user.gender,
      bio: bio || user.bio,
      phone: phone || user.phone,
      updatedAt: new Date().toISOString(),
    };

    await userStore.updateUser(userId, updatedData);

    const { passwordHash, ...userProfile } = updatedData;

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: userProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// Upload profile photo
exports.uploadPhoto = async (req, res) => {
  const userId = req.user.id;

  // TODO: Implement file upload with multer
  // For now, just return mock response
  res.json({
    success: true,
    message: "Photo upload feature coming soon",
    photoUrl: `https://ui-avatars.com/api/?name=${req.user.name}&size=200`,
  });
};

// Get user addresses
exports.getAddresses = async (req, res) => {
  const userId = req.user.id;

  // Mock data - replace with real database query
  const addresses = [
    {
      id: 1,
      label: "Rumah",
      recipientName: req.user.name,
      phone: "081234567890",
      address: "Jl. Universitas No. 9A, Kampus USU",
      district: "Padang Bulan",
      city: "Medan",
      province: "Sumatera Utara",
      postalCode: "20155",
      isDefault: true,
    },
  ];

  res.json({
    success: true,
    addresses,
  });
};

// Add new address
exports.addAddress = async (req, res) => {
  const userId = req.user.id;
  const addressData = req.body;

  // Mock response - replace with real database insert
  const newAddress = {
    id: Date.now(),
    userId,
    ...addressData,
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "Address added successfully",
    address: newAddress,
  });
};

// Update address
exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const addressData = req.body;

  // Mock response - replace with real database update
  res.json({
    success: true,
    message: "Address updated successfully",
    address: { id, ...addressData },
  });
};

// Delete address
exports.deleteAddress = async (req, res) => {
  const { id } = req.params;

  // Mock response - replace with real database delete
  res.json({
    success: true,
    message: "Address deleted successfully",
  });
};

// Get payment methods
exports.getPaymentMethods = async (req, res) => {
  const userId = req.user.id;

  // Mock data
  const paymentMethods = [];

  res.json({
    success: true,
    paymentMethods,
  });
};

// Get bank accounts
exports.getBankAccounts = async (req, res) => {
  const userId = req.user.id;

  // Mock data
  const bankAccounts = [];

  res.json({
    success: true,
    bankAccounts,
  });
};

// Add bank account
exports.addBankAccount = async (req, res) => {
  const userId = req.user.id;
  const { bankName, accountNumber, accountName } = req.body;

  // Mock response
  const newAccount = {
    id: Date.now(),
    userId,
    bankName,
    accountNumber,
    accountName,
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "Bank account added successfully",
    account: newAccount,
  });
};
