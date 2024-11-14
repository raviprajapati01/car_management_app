const router = require("express").Router();
const multer = require("multer");

const { Register, Login } = require("../controllers/auth");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), Register);

/* USER LOGIN*/
router.post("/login", Login)

module.exports = router