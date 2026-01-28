const express = require("express");
const ctrl = require("../controllers/recipes.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Public (read)
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

// Protected (write)
router.post("/", requireAuth, ctrl.create);
router.patch("/:id", requireAuth, ctrl.update);
router.delete("/:id", requireAuth, ctrl.remove);

module.exports = router;
