const jwt = require("jsonwebtoken");
const User = require("../models/User");

function getTokenFromReq(req) {
  // 1) Cookie (pour /admin via navigateur)
  if (req.cookies && req.cookies.token) return req.cookies.token;

  // 2) Authorization header (pour Axios / API)
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.split(" ")[1];

  return null;
}



async function protect(req, res, next) {
  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ message: "Not authorized (no token)" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Not authorized (user not found)" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized (invalid token)" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { protect, requireRole, getTokenFromReq };
