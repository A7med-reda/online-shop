const orderModel = require("../Models/orderModel");
const cartModel = require("../Models/cartModel");
const validationResult = require("express-validator").validationResult;

exports.getVerifyOrder = (req, res, next) => {
  //get product details from cart collection ->SEND HIDDEN order

  cartModel
    .getItemById(req.query.order)
    .then((cartItem) => {
      res.render("verify-order", {
        cartItem: cartItem,

        isUser: true,
        isAdmin: req.isAdmin,
        validationsError: req.flash("validationsError")[0],
        pageTitle: "Verify order",
      });
    })
    .catch((err) => next(err));
};

exports.getOrders = (req, res, next) => {
  // display orders of user  from db
  orderModel
    .getOrderByUser(req.session.userId)
    .then((items) => {
      res.render("orders", {
        isUser: true,
        isAdmin: req.session.isAdmin,
        items: items,
        validationsError: req.flash("validationsError")[0],
        pageTitle: "Orders",

        // orderTime: new Date().toLocaleTimeString(),
      });
    })
    .catch((err) => {
      next(err);
    });
};
// order now bottom(verify)
exports.postOrder = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    console.log(req.body);
    orderModel
      .addNewOrder(req.body)
      .then(() => {
        res.redirect("/orders");
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // req.flash(validationsError, validationResult(req).array());
    res.redirect("/verify-order?order=" + req.body.cartId);
  }
};

exports.postCancel = (req, res, next) => {
  orderModel
    .cancelOrder(req.body.orderId)
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      next(err);
    });
};
exports.postCancelAll = (req, res, next) => {
  orderModel
    .cancelAllOrder(req.session.userId)
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      next(err);
    });
};
