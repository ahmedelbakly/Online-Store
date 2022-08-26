const router = require("express").Router();
const homeController = require("../controllers/home.controler");
const protectRout = require("./protect.route")

router.get("/", homeController.getHome);

module.exports = router;
