const express = require("express");
const multer = require("multer");
const productController = require("../controller/productController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Multer setup for product image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Product routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", upload.array("images", 5), productController.createProduct); // Accept up to 5 images
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 5),
  productController.updateProduct
); // Accept up to 5 images
router.delete("/:id", productController.deleteProduct);

module.exports = router;
