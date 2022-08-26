exports.isNoLogin = (req, res, next) => {
  if (!req.session.userId) next();
  else res.redirect("/");
};
exports.isLogin = (req, res, next) => {
  if (req.session.userId) next();
  else res.redirect("/");
};
