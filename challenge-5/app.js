require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db");
const { notFound, errorHandler } = require("./middleware/error");

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");
const pagesRoutes = require("./routes/pages.routes");

const app = express();
console.log("pagesRoutes:", typeof pagesRoutes);
console.log("authRoutes :", typeof authRoutes);
console.log("menuRoutes :", typeof menuRoutes);
console.log("notFound   :", typeof notFound);
console.log("errorHandler:", typeof errorHandler);

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", pagesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes); // <= ici doit être une fonction router ✅

app.use(notFound);
app.use(errorHandler);

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 3000, () => console.log("✅ Server running")))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
