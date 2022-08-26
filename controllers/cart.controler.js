const cartModel = require("../models/cart.model");
const validationResult = require("express-validator").validationResult;

exports.getCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel.getCardByUser(req.session.userId).then((carts) => {
      res.render("cart", {
        title: "Cart",
        style: "style.css",
        isUser: req.session.userId,
        cards: carts,
        validationError: req.flash("validationCart")[0],
        validationAddress: req.flash("validationAddress")[0],
        validationAddressAll: req.flash("validationAddressAll")[0],
        isAdmin: req.session.isAdmin,
      });
    });
  } else {
    req.flash("validationCart", validationResult(req).array());
    res.redirect("/cart");
  }
};

exports.postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .addNewCart(
        req.body.productId,
        req.session.userId,
        {
          name: req.body.name,
          amount: req.body.amount,
          price: req.body.price,
          productId: req.body.productId,
          userEmail: req.session.UserEmail,
          userId: req.session.userId,
          timestamp: Date.now(),
        },
        req.body.amount
      )
      .then(() => {
        console.log(req.body);
        console.log(req.session.userId);
        res.redirect("/cart");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationCart", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};

exports.postNewAmount = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .updateAmount(req.body.cartId, {
        amount: req.body.amount,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
        console.log("update");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationCart", validationResult(req).array());
    res.redirect("/cart");
  }
};
exports.deleteCartC = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
 
    cartModel
      .deleteCart(req.body.cartId)
      .then(() => {
        res.redirect("/cart");
        console.log(req.body);
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationCart", validationResult(req).array());
    res.redirect("/cart");
  }
};
exports.deleteAllCartC = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .deleteAllCart()
      .then(() => {
        res.redirect("/cart");
        console.log("deleteAll");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationCart", validationResult(req).array());
    res.redirect("/cart");
  }
};
