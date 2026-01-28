const express = require("express");
const MenuItem = require("../models/MenuItem");
const { auth } = require("../middleware/auth");

const router = express.Router();

// READ (public)
router.get("/", async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
});

// CREATE (protected)
router.post("/", auth, async (req, res, next) => {
  try {
    const created = await MenuItem.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// UPDATE (protected)
router.put("/:id", auth, async (req, res, next) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Menu item not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE (protected)
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Deleted", id: deleted._id });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
