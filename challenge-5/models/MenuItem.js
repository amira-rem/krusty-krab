const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    price: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

// IMPORTANT : 3e argument = nom exact de la collection dans Atlas
module.exports = mongoose.model("MenuItem", menuItemSchema, "recipees");
