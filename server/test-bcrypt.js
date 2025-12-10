const bcrypt = require("bcryptjs");

const testPassword = "password123";
const hashFromDB =
  "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

console.log("Testing bcrypt...");
console.log("Password:", testPassword);
console.log("Hash:", hashFromDB);

bcrypt
  .compare(testPassword, hashFromDB)
  .then((result) => {
    console.log("\n✅ BCRYPT RESULT:", result);
    if (result) {
      console.log("🎉 PASSWORD MATCH!");
    } else {
      console.log("❌ PASSWORD MISMATCH!");
    }
  })
  .catch((err) => {
    console.error("❌ ERROR:", err.message);
  });
