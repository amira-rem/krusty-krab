const { validationResult } = require("express-validator");
const Recipe = require("../models/Recipe");

exports.list = async (req, res) => {
  const isAuthed = Boolean(req.user);
  const filter = isAuthed ? {} : { isSecret: false };

  const recipes = await Recipe.find(filter)
    .populate("createdBy", "username role")
    .sort({ createdAt: -1 });

  res.json({ recipes });
};

exports.getOne = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate("createdBy", "username role");
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  if (recipe.isSecret && !req.user) return res.status(403).json({ message: "Forbidden" });

  res.json({ recipe });
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const payload = {
    name: req.body.name,
    description: req.body.description || "",
    ingredients: req.body.ingredients || [],
    steps: req.body.steps || [],
    price: req.body.price ?? 0,
    isSecret: Boolean(req.body.isSecret),
    createdBy: req.user._id
  };

  const recipe = await Recipe.create(payload);
  res.status(201).json({ recipe });
};

exports.update = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  const isOwner = recipe.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

  const allowed = ["name", "description", "ingredients", "steps", "price", "isSecret"];
  for (const key of allowed) {
    if (key in req.body) recipe[key] = req.body[key];
  }

  await recipe.save();
  res.json({ recipe });
};

exports.remove = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  const isOwner = recipe.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

  await recipe.deleteOne();
  res.json({ message: "Recipe deleted" });
};
