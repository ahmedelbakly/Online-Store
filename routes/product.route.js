const router = require("express").Router();
const productController = require("../controllers/product.controler");

router.get("/:id", productController.getProduct );

module.exports = router;
