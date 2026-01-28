const express = require("express");
const ctrl = require("../controllers/pages.controller");

const router = express.Router();

router.get("/", (req, res) => res.redirect("/menu"));
router.get("/menu", ctrl.menuPage);
router.get("/login", ctrl.loginPage);
router.get("/admin", ctrl.adminPage);

module.exports = router;
