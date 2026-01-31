const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already used" });

  // 1er user = admin (pratique pour projet solo)
  const usersCount = await User.countDocuments();
  const role = usersCount === 0 ? "admin" : "user";

  const user = await User.create({ username, email, password, role });
  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: { id: user._id, username: user.username, email: user.email, role: user.role }
  });
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user._id);

  res.json({
    token,
    user: { id: user._id, username: user.username, email: user.email, role: user.role }
  });
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};

// Dashboard login cookie
exports.adminLoginForm = async (req, res) => {
  res.render("login", { error: null });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).render("login", { error: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).render("login", { error: "Invalid credentials" });

  if (user.role !== "admin") return res.status(403).render("login", { error: "Admin only" });

  const token = signToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.redirect("/admin");
};

exports.adminLogout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/login");
};
