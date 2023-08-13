module.exports = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/not-admin");
  }
};

// protect router
//                  /admin/add   on url  --> not admin
