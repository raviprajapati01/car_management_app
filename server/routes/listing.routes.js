const router = require("express").Router();
const multer = require("multer");
const { CreateListing, FechListing, SearchListing, detailsListing } = require("../controllers/listing");

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

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), CreateListing);

/* GET lISTINGS BY CATEGORY */
router.get("/", FechListing)

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", SearchListing)

/* LISTING DETAILS */
router.get("/:listingId", detailsListing);

module.exports = router