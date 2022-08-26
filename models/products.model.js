const mongoose = require("mongoose");
const dbUri = "mongodb://localhost:27017/online-Store";

const schema = mongoose.Schema;

const productSchema = new schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  timestamp: Number,
});

const Product = mongoose.model("product", productSchema);

exports.createNewProduct = (data) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUri).then(() => {
        let item = new Product(data);
        item.save().then(()=>{
          mongoose.disconnect();
          resolve()
          console.log("add product");
        }).catch(error=>console.log(error))
      });
    });
  };
  

  exports.getProducts = ()=>{
    return new Promise((resolve, reject)=>{
     mongoose.connect(dbUri).then(()=>{
      return Product.find().then((products)=>{
        mongoose.disconnect();
        resolve(products)
      }).catch(err=>reject(err))
     });
    })
  }

  exports.getProductsByCategory = (category)=>{
    return new Promise((resolve, reject)=>{
     mongoose.connect(dbUri).then(()=>{
      return Product.find({category:category}).then((products)=>{
        mongoose.disconnect();
        resolve(products)
      }).catch(err=>reject(err))
     });
    })
  }
  exports.getProductsById = (id)=>{
    return new Promise((resolve, reject)=>{
     mongoose.connect(dbUri).then(()=>{
      return Product.findById(id).then((product)=>{
        mongoose.disconnect();
        resolve(product)
      }).catch(err=>reject(err))
     });
    })
  }






