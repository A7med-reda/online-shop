const cartModel = require("../Models/cartModel");
const validationResult = require("express-validator").validationResult;

exports.getCart = (req, res, next) => {
  cartModel
    .getItemByUser(req.session.userId)
    .then((items) => {
      res.render("cart", {
        items: items,
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationsError: req.flash("validationsError")[0],
        userId: req.session.userId,
        pageTitle : "Cart"

      });
    })
    .catch((err) => next(err));
};
exports.postCart = (req, res, next) => {
  //from form of home (index)
  if (validationResult(req).isEmpty()) {
    cartModel
      .addNewItem({
        //from form in ejs input:hidden
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        email: req.session.email, ///////add email to cart////////
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // set validationError in homeController , productController
    req.flash("validationsError", validationResult(req).array());
    res.redirect(req.body.redirectTo); // from ejs hiden
  }
};
// update cart item
exports.postSave = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .editItem(req.body.cartId, {
        amount: req.body.amount,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        next(err);
      });
  } else {
    req.flash("validationsError", validationResult(req).array());
    res.redirect("/cart");
  }
};

exports.postDelete = (req, res, next) => {
  cartModel
    .deleteItem(req.body.cartId)
    .then(() => {
      res.redirect("/cart/");
    })
    .catch((err) => next(err));
};

exports.postDeleteAll = (req, res, next) => {
  cartModel
    .deleteAll(req.session.userId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      next(err);
    });
};
