const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/auth.middleware");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").isString().isLength({ min: 3 }).withMessage("username min 3 chars"),
    body("email").isEmail().withMessage("valid email required"),
    body("password").isLength({ min: 6 }).withMessage("password min 6 chars")
  ],
  auth.register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isString().notEmpty()],
  auth.login
);

router.get("/me", protect, auth.me);

module.exports = router;
