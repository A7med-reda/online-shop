// Authentication
//Sign up
//Login
//logout
const authModel = require("../Models/authModel");
const validationResult = require("express-validator").validationResult;

exports.getSignup = (req, res, next) => {
  let authError = req.flash("authError")[0];
  let validationErrors = req.flash("validationErrors");
  res.render("signup", {
    authError: authError,
    validationErrors: validationErrors,
    isUser: false, // hide login , signup
    isAdmin: false,
    pageTitle : "Signup"

  });
};

exports.postSignup = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    return authModel
      .createNewUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        req.flash("authError", err); // db err Email is used
        res.redirect("/signup");
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/signup"); //to same page
  }
};

exports.getLogin = (req, res, next) => {
  // 2-render AuthError
  let validationsError = req.flash("validationsError");
  res.render("login", {
    authError: req.flash("authError")[0],
    validationsError: validationsError,
    isUser: false,
    isAdmin: false,
    pageTitle : "Login"

  });
};

exports.postLogin = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    authModel
      .Login(req.body.email, req.body.password)
      .then((result) => {
        // set session id with user._id
        //add property userId
        //session will send cooke to browser with session.id
        // Each session has a unique cookie object
        req.session.userId = result.id;
        req.session.isAdmin = result.isAdmin;
        req.session.email = result.email;
        res.redirect("/");
      })
      .catch((err) => {
        //1- save err
        req.flash("authError", err); // from db
        res.redirect("/login");
      });
  } else {
    req.flash("validationsError", validationResult(req).array()); //from route
    res.redirect("/login"); // to same page
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
