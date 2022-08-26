// const mongoose = require("mongoose");
// const dbUri = "mongodb://localhost:27017/online-Store";
// const schema = mongoose.Schema;
// const productSchema = new schema({
//   name: String,
//   description: String,
//   image: String,
//   price: Number,
//   category: String,
//   timestamp: Number,
// });

// //const Product = mongoose.model("product", productSchema);

// // exports.createNewProduct = (data) => {
// //   return new Promise((resolve, reject) => {
// //     mongoose.connect(dbUri).then(() => {
// //       let item = new Product(data);
// //       item.save().then(()=>{
// //         mongoose.disconnect();
// //         resolve()
// //         console.log("add product");
// //       }).catch(error=>console.log(error))
// //     });
// //   });
// // };

// // exports.LoginUser = (email, password) => {
// //   return new Promise((resolve, reject) => {
// //     mongoose.connect(dbUri).then(() => {
// //       return User.findOne({ email: email })
// //         .then((user) => {
// //           if (!user) {
// //             mongoose.disconnect();
// //             reject("No account is match this email");
// //           } else {
// //             return bcrypt.compare(password, user.password).then((same) => {
// //               if (!same) {
// //                 mongoose.disconnect();
// //                 reject("your password is incorrect");
// //               } else {
// //                 mongoose.disconnect();
// //                 resolve(user._id);
// //               }
// //             });
// //           }
// //         })
// //         .catch((err) => {
// //           mongoose.disconnect();

// //           reject(err);
// //         });
// //     });
// //   });
// // };
// // //
