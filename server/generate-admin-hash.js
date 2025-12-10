/**
 * Generate Bcrypt Hash untuk Admin Password
 * Jalankan: node generate-admin-hash.js
 */
const bcrypt = require("bcryptjs");

async function generateAdminHash() {
  const password = "admin123"; // Password default admin
  const saltRounds = 10;

  console.log("🔐 Generating bcrypt hash for admin password...");
  console.log("Password:", password);
  console.log("");

  const hash = await bcrypt.hash(password, saltRounds);

  console.log("✅ Hash berhasil dibuat!");
  console.log("");
  console.log("================================================");
  console.log("COPY HASH INI KE supabase-schema.sql:");
  console.log("================================================");
  console.log(hash);
  console.log("================================================");
  console.log("");
  console.log("📝 Ganti bagian ini di supabase-schema.sql:");
  console.log("   INSERT INTO users ... VALUES");
  console.log("   ('Admin Unily', 'admin@unily.com', '" + hash + "', ...)");
  console.log("");
  console.log("⚠️  PENTING: Ganti password ini setelah first login!");
}

generateAdminHash();
