const express = require("express");
const categoryController = require("../controller/categoryController"); // Fixed import path
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
