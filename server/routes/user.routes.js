const router = require("express").Router()
const {getProductList } = require("../controllers/user")


/* GET PROPERTY LIST */
router.get("/:userId/properties", getProductList)


module.exports = router