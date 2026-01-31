const express = require("express");
const Recipe = require("../models/Recipe");
const { protect } = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/login", authController.adminLoginForm);
router.post("/login", authController.adminLogin);
router.get("/logout", authController.adminLogout);

router.get("/", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  const recipes = await Recipe.find().populate("createdBy", "username role").sort({ createdAt: -1 });
  res.render("admin", { user: req.user, recipes });
});

module.exports = router;
