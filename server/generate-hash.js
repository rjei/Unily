const bcrypt = require("bcryptjs");

const password = "password123";

console.log("Generating bcrypt hash for:", password);

bcrypt
  .hash(password, 10)
  .then((hash) => {
    console.log("\n✅ NEW HASH:");
    console.log(hash);

    // Test the new hash immediately
    bcrypt.compare(password, hash).then((match) => {
      console.log("\n🧪 Verification:", match ? "✅ MATCH!" : "❌ FAIL");
    });
  })
  .catch((err) => {
    console.error("❌ ERROR:", err);
  });
