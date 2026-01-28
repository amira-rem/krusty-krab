const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing. Put it in .env");

  // Recommended options are mostly defaults in recent mongoose versions.
  await mongoose.connect(uri);

  console.log("✅ MongoDB connected");
};
