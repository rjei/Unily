const db = require("../db/connection");

const createError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details) error.details = details;
  return error;
};

// GET /api/chat/history/:sellerId - Get chat history with a seller
exports.getChatHistory = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const buyerId = req.user.id;

    // Get or create chat room
    let room = await db.query(
      `SELECT id FROM chat_rooms WHERE 
       (buyer_id = $1 AND seller_id = $2) OR 
       (buyer_id = $2 AND seller_id = $1)`,
      [buyerId, sellerId]
    );

    if (room.rows.length === 0) {
      // Create new room
      room = await db.query(
        `INSERT INTO chat_rooms (buyer_id, seller_id) 
         VALUES ($1, $2) RETURNING id`,
        [buyerId, sellerId]
      );
    }

    const roomId = room.rows[0].id;

    // Get messages
    const result = await db.query(
      `SELECT 
        cm.id,
        cm.sender_id as "senderId",
        cm.message,
        cm.created_at as timestamp,
        cm.is_read as "isRead",
        u.nama as "senderName"
       FROM chat_messages cm
       JOIN users u ON cm.sender_id = u.id_users
       WHERE cm.room_id = $1
       ORDER BY cm.created_at ASC`,
      [roomId]
    );

    // Mark messages as read
    await db.query(
      `UPDATE chat_messages SET is_read = true 
       WHERE room_id = $1 AND sender_id != $2`,
      [roomId, buyerId]
    );

    res.status(200).json({
      success: true,
      data: {
        sellerId: parseInt(sellerId),
        roomId,
        messages: result.rows,
      },
    });
  } catch (error) {
    console.error("[Chat] Get history error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil riwayat chat",
    });
  }
};

// POST /api/chat/start - Start a chat with seller
exports.startChat = async (req, res) => {
  try {
    const { sellerId, message } = req.body;
    const buyerId = req.user.id;

    if (!sellerId || !message) {
      return res.status(400).json({
        success: false,
        message: "sellerId dan message required",
      });
    }

    // Get or create chat room
    let room = await db.query(
      `SELECT id FROM chat_rooms WHERE 
       (buyer_id = $1 AND seller_id = $2) OR 
       (buyer_id = $2 AND seller_id = $1)`,
      [buyerId, sellerId]
    );

    let roomId;
    if (room.rows.length === 0) {
      // Create new room
      const newRoom = await db.query(
        `INSERT INTO chat_rooms (buyer_id, seller_id) 
         VALUES ($1, $2) RETURNING id`,
        [buyerId, sellerId]
      );
      roomId = newRoom.rows[0].id;
    } else {
      roomId = room.rows[0].id;
    }

    // Insert message
    const result = await db.query(
      `INSERT INTO chat_messages (room_id, sender_id, message) 
       VALUES ($1, $2, $3) RETURNING id, created_at`,
      [roomId, buyerId, message.trim()]
    );

    console.log(`[Chat] User ${buyerId} started chat with seller ${sellerId}`);

    res.status(201).json({
      success: true,
      message: "Chat dimulai",
      data: {
        id: result.rows[0].id,
        senderId: buyerId,
        receiverId: parseInt(sellerId),
        message: message,
        timestamp: result.rows[0].created_at,
        isRead: false,
        roomId,
      },
    });
  } catch (error) {
    console.error("[Chat] Start error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memulai chat",
    });
  }
};

module.exports = {
  getChatHistory: exports.getChatHistory,
  startChat: exports.startChat,
};
