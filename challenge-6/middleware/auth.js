const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, email, iat, exp }
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
