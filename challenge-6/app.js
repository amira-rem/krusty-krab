require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./db");
const pagesRoutes = require("./routes/pages.routes");
const authRoutes = require("./routes/auth.routes");
const recipesRoutes = require("./routes/recipes.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static assets
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", pagesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    process.exit(1);
  });
