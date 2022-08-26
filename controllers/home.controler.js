const productModel = require("../models/products.model");


exports.getHome = (req, res, next) => {
  let category = req.query.category;
  const categories = ["clothes", "electronic", "mobile", "other"];
  category && categories.includes(category)
    ? productModel.getProductsByCategory(category).then((products) => {
        res.render("index", {
          products: products,
          title: "Home",
          style: "style.css",
          isUser: req.session.userId,
          validationCart: req.flash("validationCart")[0],
          isAdmin: req.session.isAdmin,
        });
        console.log(req.query.category);
      })
    : productModel.getProducts().then((products) => {
        res.render("index", {
          products: products,
          title: "Home",
          style: "style.css",
          isUser: req.session.userId,
          validationCart: req.flash("validationCart")[0],
          isAdmin: req.session.isAdmin,
        });
      });
};