const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const { getTokenFromReq } = require("./middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

dotenv.config();

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }));
app.use(morgan("dev"));

// Attache req.user si token prÃ©sent (sans bloquer les routes publiques)
app.use(async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return next();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) req.user = user;
  } catch (e) {}
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/recipes", require("./routes/recipes.routes"));
app.use("/admin", require("./routes/admin.routes"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("âŒ DB connection error:", err.message);
    process.exit(1);
  });
