exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) next();
  else res.redirect("/");
};

exports.isNoAdmin = (req, res, next) => {
  if (!req.session.isAdmin) next();
  else res.redirect("/");
};