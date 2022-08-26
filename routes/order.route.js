const router = require("express").Router();
const orderController = require("../controllers/order.control");
const protectRout = require("./protect.route");
const protectIsAdmin= require("./protectAdmin");
const check = require("express-validator").check;
const bodyParser = require("body-parser");





router.get("/order", protectRout.isLogin, orderController.getOrder);
//***************************************************************************************** */
router.get("/admin/mangeOrder", protectIsAdmin.isAdmin, orderController.getMangeOrder);


router.get("/admin/mangeOrderSr", protectIsAdmin.isAdmin, orderController.getMangeSearch);
//*************************************************************************************************** */

router.post(
  "/order",
  protectRout.isLogin,

  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("this filed is required")
    .isInt({ min: 1 })
    .withMessage("this filed must be more than 0"),
  check("address").not().isEmpty().withMessage("Address is required , please write you address"),

  orderController.postOrder
);

//*************************************************************************************************** */

router.post(
  "/order/orderAll",
  protectRout.isLogin,  bodyParser.urlencoded({ extended: true }),

  check("address").not().isEmpty().withMessage("Address is required , please write you address"),

  orderController.orderAll
);

//*************************************************************************************************** */

router.post(
  "/order/delete",
  protectRout.isLogin,
  bodyParser.urlencoded({ extended: true }),
  orderController.deleteOrderC
);
//*************************************************************************************************** */

router.post(
  "/order/deleteAll",
  protectRout.isLogin,
  orderController.deleteAllOrderC
);
//*************************************************************************************************** */

router.post(
  "/admin/upDateStatus",
  protectIsAdmin.isAdmin,
  bodyParser.urlencoded({extended:true}),
  orderController.postStatus




)




////*************************************************************************************************** */


module.exports = router;
