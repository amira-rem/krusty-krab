const express = require("express");
const { body } = require("express-validator");
const recipes = require("../controllers/recipes.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", recipes.list);
router.get("/:id", recipes.getOne);

router.post(
  "/",
  protect,
  [body("name").isString().isLength({ min: 2 }).withMessage("name min 2 chars")],
  recipes.create
);

router.patch("/:id", protect, recipes.update);
router.delete("/:id", protect, recipes.remove);

module.exports = router;
