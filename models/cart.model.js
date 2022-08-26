const mongoose = require("mongoose");
const dbUri = "mongodb://localhost:27017/online-Store";

const schema = mongoose.Schema;

const cartSchema = new schema({
  name: String,
  userId: String,
  amount: Number,
  price: Number,
  productId: String,
  timestamp: Number,
  userEmail: String,
});
const Cart = mongoose.model("cart", cartSchema);
exports.Cart = Cart;
exports.addNewCart = (id, userId, data, amountValue) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Cart.findOne({ productId: id, userId: userId }).then((product) => {
        if (product) {
          Cart.updateOne(
            { _id: product._id }, //or another condition  {productId: id, userId: userId }
            {
              amount: parseInt(amountValue) + parseInt(product.amount),
              timestamp: Date.now(),
            }
          )
            .then(() => {
              mongoose.disconnect();
              console.log(product);
              console.log("edit");
              resolve();
            })
            .catch((err) => console.error(err));
        } else {
          let item = new Cart(data);
          item
            .save()
            .then(() => {
              mongoose.disconnect();
              console.log(item);
              console.log("new");
              console.log(product);
              resolve();
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
    });
  });
};

exports.getCardByUser = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Cart.find({ userId: id }, {}, { sort: { timestamp: 1 } })
        .then((carts) => {
          mongoose.disconnect();
          resolve(carts);
        })
        .catch((err) => reject(err));
    });
  });
};

exports.updateAmount = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      Cart.updateOne({ _id: id }, newData)
        .then((cards) => {
          mongoose.disconnect();
          resolve(cards);
        })
        .catch((err) => console.log(err));
    });
  });
};
exports.deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Cart.deleteOne({ _id: id })
        .then(() => {
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
};
exports.deleteAllCart = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return Cart.deleteMany()
        .then(() => {
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
};
