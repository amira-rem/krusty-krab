const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.render("menu", { items });
  } catch (e) {
    next(e);
  }
});

router.get("/login", (req, res) => res.render("login"));

router.get("/admin", async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.render("admin", { items });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
