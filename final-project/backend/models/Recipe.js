const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    description: { type: String, trim: true, maxlength: 500 },
    ingredients: [{ type: String, trim: true }],
    steps: [{ type: String, trim: true }],
    price: { type: Number, min: 0, default: 0 },
    isSecret: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
