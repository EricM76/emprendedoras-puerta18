module.exports = (req, res, next) => {
    if (req.session.userLogin && req.session.userLogin.rol == "user") {
      return next();
    } else {
      return res.redirect("/");
    }
  };
  