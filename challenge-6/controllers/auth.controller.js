const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
  return jwt.sign({ sub: user._id.toString(), email: user.email }, secret, { expiresIn });
}

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "email and password are required" });

    const user = await User.create({ email, password });
    const token = signToken(user);
    res.status(201).json({ message: "Registered", token });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ message: "Logged in", token });
  } catch (e) {
    next(e);
  }
};
