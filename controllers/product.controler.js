const productModel = require("../models/products.model");

exports.getProduct = (req,res,next)=>{
    const id =req.params.id;
    productModel.getProductsById(id).then((product) => {
        res.render("product", { prod: product, title: "Product-Info" , style:"style.css", isUser: req.session.userId,
        isAdmin: req.session.isAdmin});
      })


}





 
  
  