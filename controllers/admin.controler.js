const productModel = require("../models/products.model");
const protectAdmin = require("../routes/protectAdmin");
const validationResult = require("express-validator").validationResult;

//******************************************************************************************* */

exports.getAddProduct = (req, res, next) => {
  res.render("addProduct", {
    title: "Add-Product",
    style: "Signup.css",
    productAddError: req.flash("productAddError")[0],
    productError: req.flash("productError"),
    isUser: true,
    isAdmin: true,
  });
};

//********************************************************************************************** */

exports.postProduct = (req, res, next) => {

  if (validationResult(req).isEmpty()) {
   
    productModel
      .createNewProduct({
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        price: req.body.price,
        category: req.body.category,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/");
        console.log(req.body.image);
        console.log(req.file);
      })
      .catch((err) => {
        req.flash("productAddError", err);
        res.redirect("/");
      });
  } else {
    req.flash("productError", validationResult(req).array());
    res.redirect("/admin/add");
    console.log(req.body);
  }
};
// 