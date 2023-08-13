const router = require("express").Router();
const homeController = require("../Controllers/homeController");
router.get("/", homeController.getHomeAndCategory);

module.exports = router;
