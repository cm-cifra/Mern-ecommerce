const express = require("express");
const multer = require("multer");
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Multer setup for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//user routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile/:id", authMiddleware, authController.getProfile);

router.put(
  "/profile/:id",
  authMiddleware,
  upload.single("image"),
  authController.updateProfile
);

module.exports = router;
