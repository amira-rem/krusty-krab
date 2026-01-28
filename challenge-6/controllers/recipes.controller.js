const Recipe = require("../models/Recipe");

exports.getAll = async (req, res, next) => {
  try {
    const items = await Recipe.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    next(e);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await Recipe.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Recipe.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Recipe.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
