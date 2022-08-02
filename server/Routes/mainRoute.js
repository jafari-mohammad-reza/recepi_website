const router = require("express").Router()
const mainController = require("../controllers/mainController.js")
router.get("/" , mainController.homePage);
module.exports = router;
