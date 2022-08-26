const router = require("express").Router();
const cartController = require("../controllers/cart.controler");
const protectRout = require("./protect.route");
const check = require("express-validator").check;
const bodyParser =require("body-parser")
 router.get("/cart",protectRout.isLogin, cartController.getCart );

router.post(
  "/cart",
  protectRout.isLogin,
 
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("this filed is required")
    .isInt({ min: 1 })
    .withMessage("this filed must be more than 0"),
    cartController.postCart
);
router.post(
  "/cart/save",
  protectRout.isLogin,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("this filed is required")
    .isInt({ min: 1 })
    .withMessage("this filed must be more than 0"),
    cartController.postNewAmount
);
router.post(
  "/cart/delete",
  protectRout.isLogin,
  bodyParser.urlencoded({ extended: true }),
    cartController.deleteCartC
);
router.post(
  "/cart/deleteAll",
  protectRout.isLogin,
    cartController.deleteAllCartC
);

module.exports = router;
