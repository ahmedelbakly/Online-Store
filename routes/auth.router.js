const router = require("express").Router();
const authControler = require("../controllers/auth.controler");
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const protectRoute = require("./protect.route")

router.get("/signup", protectRoute.isNoLogin, authControler.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("this username is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("this email is required")
    .isEmail()
    .withMessage("this email invalid"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("this password is required")
    .isLength({ min: 6, max: 15 })
    .withMessage("password between 6 and 15"),
  check("retype-password").custom((value, { req }) => {
    if (value === req.body.password) {
      return true;
    } else throw "password in not matched";
  }), protectRoute.isNoLogin,

  authControler.postSignup
);
router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("this email is required")
    .isEmail()
    .withMessage("this email invalid"),
  check("password").not().isEmpty().withMessage("this password is required"),
  protectRoute.isNoLogin,
  authControler.postLogin
);

router.get("/login",  protectRoute.isNoLogin,authControler.getLogin);
router.all("/logout",authControler.logout);

module.exports = router;
