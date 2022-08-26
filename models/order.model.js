const mongoose = require("mongoose");
const dbUri = "mongodb://localhost:27017/online-Store";
const cartModel = require("../models/cart.model");

const schema = mongoose.Schema;

const orderSchema = new schema({
  name: String,
  userEmail: String,
  userId: String,
  amount: Number,
  price: Number,
  cartId: String,
  timestamp: Number,
  address: String,
  status: String,
});
const Order = mongoose.model("order", orderSchema);
//exports.Order = Order
//*************************************************************************** */
exports.addNewOrder = (id, data) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      let item = new Order(data);
      item
        .save()
        .then(() => {
          return cartModel.Cart.findByIdAndDelete(id);
        })
        .then(() => {
          mongoose.disconnect();
          console.log(item);
          console.log("Add item");
          resolve();
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};
exports.addAllOrder = (id, address) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      cartModel.Cart.find({ userId: id }).then((data) => {
        return data.map((item) => {
          let itemD = new Order({
            name: item.name,
            userId: item.userId,
            userEmail: item.userEmail,
            amount: item.amount,
            price: item.price,
            cartId: item._id,
            timestamp: Date.now(),
            address: address,
            status: "pending",
          });
          itemD
            .save()
            .then(() => {
              return cartModel.Cart.findByIdAndDelete(item._id);
            })
            .then(() => {
              mongoose.disconnect();
              console.log(item);
              console.log("Add item");
              resolve();
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        });
      });
    });
  });
};
//

exports.getOrderByUser = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Order.find({ userId: id }, {}, { sort: { timestamp: 1 } })
        .then((order) => {
          mongoose.disconnect();
          resolve(order);
        })
        .catch((err) => reject(err));
    });
  });
};

//****************************************************** */
exports.deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Order.deleteOne({ _id: id })
        .then(() => {
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
};

//****************************************************************** */
exports.deleteAllOrder = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Order.deleteMany({ userId: id })
        .then(() => {
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
};

//***************************************************************************** */
exports.getAllOrder = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      Order.find()
        .then((orders) => {
          mongoose.disconnect();
          resolve(orders);
        })
        .catch((err) => console.log(err));
    });
  });
};

//***************************************************************************** */
exports.getOrderByStatus = (status) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(()=>{
      return Order.find({ status: status })
      .then((orders) => {
        mongoose.disconnect();
        resolve(orders);
      })
      .catch((err) => {
        console.log(err);
      });
    })
   
  });
};

//***************************************************************************** */
exports.updateStatus = (id,data)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(dbUri).then(()=>{
      return Order.findByIdAndUpdate(id,data).then(()=>{
        mongoose.disconnect();
        resolve();
      })
    })
    
  })
}


//********************************************************************************* */

exports.getOrderByStatus = (status) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      Order.find({status:status})
        .then((orders) => {
          mongoose.disconnect();
          resolve(orders);
        })
        .catch((err) => console.log(err));
    });
  });
};
exports.getOrderByEmail = (email) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      Order.find({userEmail:email})
        .then((orders) => {
          mongoose.disconnect();
          resolve(orders);
        })
        .catch((err) => console.log(err));
    });
  });
};
