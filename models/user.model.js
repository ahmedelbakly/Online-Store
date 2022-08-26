const mongoose = require("mongoose");
const dbUri = "mongodb://localhost:27017/online-Store";
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const UserSchema = new schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", UserSchema);

exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return User.findOne({ email: email }).then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("this email is used by another user");
          console.log(user);
        } else {
          return bcrypt
            .hash(password, 10)
            .then((hashPass) => {
              let user = new User({
                username: username,
                email: email,
                password: hashPass,
              });
              return user.save();
            })
            .then(() => {
              mongoose.disconnect();
              console.log("usercreated");

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

exports.LoginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri).then(() => {
      return User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            mongoose.disconnect();
            reject("No account is match this email");
          } else {
            return bcrypt.compare(password, user.password).then((same) => {
              if (!same) {
                mongoose.disconnect();
                reject("your password is incorrect");
              } else {
                mongoose.disconnect();
                resolve(user);
              }
            });
          }
        })
        .catch((err) => {
          mongoose.disconnect();

          reject(err);
        });
    });
  });
};
