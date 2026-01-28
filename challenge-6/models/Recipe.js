const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    price: { type: Number, required: true, min: 0 },
    ingredients: [{ type: String, trim: true }],
    description: { type: String, trim: true, maxlength: 300 },
    isSecret: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// If your Atlas collection is named differently, change the 3rd argument below.
// For your previous challenge, the collection name was "recipees".
module.exports = mongoose.model("Recipe", recipeSchema, "recipees");
