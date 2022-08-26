const orderModel = require("../models/order.model");
const validationResult = require("express-validator").validationResult;
//*************************************************************************************************** */

//

//*************************************************************************************************** */

exports.getOrder = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    orderModel.getOrderByUser(req.session.userId).then((order) => {
      res.render("order", {
        title: "orders",
        style: "style.css",
        isUser: req.session.userId,
        orders: order,
        validationOrder: req.flash("validationOrder")[0],
        isAdmin: req.session.isAdmin,
      });
    });
  } else {
    req.flash("validationOrder", validationResult(req).array());
    res.redirect("/order");
  }
};

//*************************************************************************************************** */

exports.postOrder = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    orderModel
      .addNewOrder(req.body.cartId, {
        name: req.body.name,
        userId: req.session.userId,
        userEmail: req.session.UserEmail,
        amount: req.body.amount,
        price: req.body.price,
        cartId: req.body.cartId,
        timestamp: Date.now(),
        address: req.body.address,
        status: "pending",
      })
      .then(() => {
        console.log(req.body);
        console.log(req.session.userId);
        res.redirect("/order");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationAddress", validationResult(req).array());
    res.redirect("/cart");
  }
};
//*************************************************************************************************** */
exports.orderAll = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    orderModel
      .addAllOrder(req.session.userId, req.body.address)
      .then(() => {
        res.redirect("/order");
        console.log("orderAll");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationAddressAll", validationResult(req).array());
    res.redirect("/cart");
    console.log(req.body);
  }
};

//****************************************************************************************** */
exports.deleteOrderC = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    orderModel
      .deleteOrder(req.body.orderId)
      .then(() => {
        res.redirect("/order");
        console.log("delete");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationOrder", validationResult(req).array());
    res.redirect("/order");
  }
};
exports.deleteAllOrderC = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    orderModel
      .deleteAllOrder(req.session.userId)
      .then(() => {
        res.redirect("/order");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationOrder", validationResult(req).array());
    res.redirect("/order");
  }
};

//************************************************************************************** */

exports.getMangeOrder = (req, res, next) => {
  let Status = req.query.status;
  const StatusList = ["pending", "sent", "completed"];
  Status && StatusList.includes(Status)
    ? orderModel.getOrderByStatus(Status).then((orders) => {
        res.render("mangeOrder", {
          title: "Mange-Order",
          style: "style.css",
          isUser: req.session.userId,
          AllOrders: orders,
          validationMangeOrder: req.flash("validationMangeOrder")[0],
          isAdmin: req.session.isAdmin,
        });
        console.log(req.query.category);
      })
    : orderModel.getAllOrder().then((orders) => {
        res.render("mangeOrder", {
          title: "Mange-Order",
          style: "style.css",
          isUser: req.session.userId,
          AllOrders: orders,
          validationMangeOrder: req.flash("validationMangeOrder")[0],
          isAdmin: req.session.isAdmin,
        });
        console.log(orders);
      });
};
// exports.getMangeOrder = (req, res, next) => {
//   if (validationResult(req).isEmpty()) {
//
//   } else {
//     req.flash("validationMangeOrder", validationResult(req).array());
//     res.redirect("/order");
//   }
// };

//************************************************************************************** */
exports.getMangeSearch = (req, res, next) => {
  orderModel.getOrderByEmail(req.query.email).then((orders) => {
    res.render("mangeOrder", {
      title: "Mange-Order",
      style: "style.css",
      isUser: req.session.userId,
      AllOrders: orders,
      validationMangeOrder: req.flash("validationMangeOrder")[0],
      isAdmin: req.session.isAdmin,
    });
    console.log(orders);
  });
};

//************************************************************************************** */

exports.postStatus = (req, res, next) => {
  orderModel.updateStatus(req.body.orderId, { status: req.body.status });
};

//************************************************************************************** */
