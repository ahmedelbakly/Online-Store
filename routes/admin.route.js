const router = require("express").Router();
const adminControler = require("../controllers/admin.controler");
const check = require("express-validator").check;
const protectAdmin = require("./protectAdmin");
const multer = require("multer");

router.get("/add", protectAdmin.isAdmin, adminControler.getAddProduct);

router.post(
  "/add",
  protectAdmin.isAdmin,
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  check("name").not().isEmpty().withMessage("this name is required"),
  check("price")
    .not()
    .isEmpty()
    .withMessage("price is required")
    .isInt()
    .withMessage("add the price more than 0 EP"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("this description is required"),

  check("category").not().isEmpty().withMessage("the category is required"),
  check("image").custom((value, { req }) => {
    if (req.file) {
      return true;
    } else {
      throw "the image is required";
    }
  }),
  adminControler.postProduct
);

//**************************************************************************** */

//  
//**************************************************************** */
// 

module.exports = router;
