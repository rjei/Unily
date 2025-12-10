const userStore = require("../storage/userStore");
const db = require("../db/connection");

const createError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
};

const becomeSeller = async (req, res) => {
  // req.user harus sudah ada dari authenticate middleware
  if (!req.user) {
    throw createError(401, "Unauthorized: No user found");
  }

  const userId = req.user.id;

  // Check if user is already a seller
  if (req.user.role === "penjual") {
    throw createError(400, "User is already a seller");
  }

  const updatedUser = await userStore.updateRole(userId, "penjual");
  if (!updatedUser) {
    throw createError(500, "Failed to update user role");
  }

  res.status(200).json({
    message: "Successfully became a seller",
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
    },
  });
};

// GET /api/sellers/:id - Get seller profile
const getSellerProfile = async (req, res) => {
  const { id } = req.params;

  // Mock seller data - replace with real DB query
  const seller = {
    id: parseInt(id),
    name: "Seller Example",
    email: "seller@example.ac.id",
    role: "penjual",
    bio: "Penjual terpercaya sejak 2020",
    avatar: "/default-avatar.png",
    followers: 245,
    rating: 4.8,
    totalSales: 1250,
    joinDate: "2020-01-15",
    location: "Jakarta",
  };

  res.status(200).json({
    success: true,
    data: seller,
  });
};

// GET /api/sellers/:id/products - Get seller's products
const getSellerProducts = async (req, res) => {
  const { id } = req.params;

  // Mock products - replace with real DB query
  const products = [
    {
      id: 1,
      name: "Laptop Gaming",
      price: 15000000,
      image: "/products/laptop.jpg",
      category: "Elektronik",
      rating: 4.5,
      sold: 45,
    },
    {
      id: 2,
      name: "Buku Pemrograman",
      price: 150000,
      image: "/products/book.jpg",
      category: "Buku",
      rating: 4.8,
      sold: 120,
    },
  ];

  res.status(200).json({
    success: true,
    data: products,
  });
};

// POST /api/sellers/:id/follow - Follow a seller
const followSeller = async (req, res) => {
  if (!req.user) {
    throw createError(401, "Unauthorized");
  }

  const sellerId = parseInt(req.params.id);
  const userId = req.user.id;

  if (sellerId === userId) {
    throw createError(400, "Cannot follow yourself");
  }

  try {
    // Check if already following
    const existing = await db.query(
      `SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2`,
      [userId, sellerId]
    );

    if (existing.rows.length > 0) {
      // Unfollow
      await db.query(
        `DELETE FROM follows WHERE follower_id = $1 AND following_id = $2`,
        [userId, sellerId]
      );
      return res.status(200).json({
        success: true,
        message: "Successfully unfollowed seller",
        action: "unfollowed",
      });
    } else {
      // Follow
      await db.query(
        `INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)`,
        [userId, sellerId]
      );
      return res.status(200).json({
        success: true,
        message: "Successfully followed seller",
        action: "followed",
        data: {
          sellerId,
          followedAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error("[Follow] Error:", error);
    throw createError(500, "Failed to follow seller");
  }
};

// GET /api/sellers/:id/followers - Get seller's followers
const getFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT 
        u.id_users as id,
        u.nama as name,
        u.photo_url as avatar,
        f.created_at as "followedAt"
       FROM follows f
       JOIN users u ON f.follower_id = u.id_users
       WHERE f.following_id = $1
       ORDER BY f.created_at DESC`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: {
        count: result.rows.length,
        followers: result.rows,
      },
    });
  } catch (error) {
    console.error("[Followers] Error:", error);
    throw createError(500, "Failed to get followers");
  }
};

// GET /api/users/:id/following - Get user's following list
const getFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT 
        u.id_users as id,
        u.nama as name,
        u.photo_url as avatar,
        u.role,
        f.created_at as "followedAt"
       FROM follows f
       JOIN users u ON f.following_id = u.id_users
       WHERE f.follower_id = $1
       ORDER BY f.created_at DESC`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: {
        count: result.rows.length,
        following: result.rows,
      },
    });
  } catch (error) {
    console.error("[Following] Error:", error);
    throw createError(500, "Failed to get following list");
  }
};

module.exports = {
  becomeSeller,
  getSellerProfile,
  getSellerProducts,
  followSeller,
  getFollowers,
  getFollowing,
};
