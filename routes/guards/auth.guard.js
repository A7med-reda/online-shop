exports.isAuth = (req, res, next) => {
  //is user or not
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

// /login  in url (display - in ejs not useful) so -> session.userId is false 
//  till now he is not user  (/login) and don't have req.session.userId 
exports.notAuth = (req, res, next) => {
  //is user or not
  if (!req.session.userId) {
    next();
  } else {
    res.redirect("/");
  }
};
