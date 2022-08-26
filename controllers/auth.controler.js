const UserModel = require("../models/user.model");
const validationResult = require("express-validator").validationResult;
exports.getSignup = (req, res, next) => {
  res.render("signup", {
    title: "Signup",
    style: "Signup.css",
    signupErr: req.flash("signupErr")[0],
    validationResult:req.flash("validationResult"),
    isUser:false,
    isAdmin: false
  });
};
exports.postSignup = (req, res, next) => {
if (validationResult(req).isEmpty()) {
  UserModel.createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => res.redirect("/login"))
    .catch((err) => {
      req.flash("signupErr", err);
      res.redirect("/signup");
    });
}else{
req.flash("validationResult",validationResult(req).array())
res.redirect("/signup")
}
  
};
exports.postLogin = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    UserModel.LoginUser(req.body.email, req.body.password)
    .then((result) => {
      req.session.userId = result._id;
      req.session.UserEmail = result.email;
      req.session.isAdmin = result.isAdmin;
      res.redirect("/");
      console.log(result);
    })
    .catch((err) => {
      req.flash("LoginError", err);
      res.redirect("/login");
    });
  }else{
    req.flash("validationResultLogin",validationResult(req).array())
    res.redirect("/login")
  }
 
};

exports.getLogin = (req, res, next) => {
  res.render("login", {
    title: "Login",
    style: "login.css",
    LoginError: req.flash("LoginError")[0],
    validationResultLogin:req.flash("validationResultLogin"),
    isUser:false,
    isAdmin: false
  });
};
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
