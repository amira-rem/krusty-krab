const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);

  if (!token) return res.status(401).json({ message: "Unauthorized: missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub: userId, email }
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
}

module.exports = { auth };
