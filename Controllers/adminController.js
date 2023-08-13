const validationResult = require("express-validator").validationResult;
const productModel = require("../Models/productsModel");
const orderModel = require("../Models/orderModel");

exports.getAdd = (req, res, next) => {
  let validationError = req.flash("validationError");
  res.render("addProduct", {
    validationErrors: validationError,
    isUser: true,
    isAdmin: true,
    productAdded: req.flash("added")[0],
    pageTitle: "Add Product",
  });
};

exports.postAdd = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    req.body.image = req.file.filename;
    productModel
      .addNewProduct(req.body)
      .then(() => {
        req.flash("added", true);
        res.redirect("/");
      })
      .catch((err) => {
        next(err);
      });
  } else {
    req.flash("validationError", validationResult(req).array());
    res.redirect("/admin/add");
  }
};

exports.getManageOrders = (req, res, next) => {
  orderModel
    .getAllOrders()
    .then((items) => {
      res.render("manage-orders", {
        isUser: true,
        isAdmin: true,
        items: items,
        pageTitle: "Manage Orders",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateStatus = (req, res, next) => {
  orderModel
    .updateStatus(
      { _id: req.body.orderId, productId: req.body.productId },
      req.body.status
    )
    .then(() => {
      res.redirect("/admin/manage/orders");
    })
    .catch((err) => {
      next(err);
    });
};

exports.getFilterOrders = (req, res, next) => {
  let validStatues = ["pending", "sent", "complete"];
  let statues = req.query.status;
  let promiseItems;

  if (statues && validStatues.includes(statues)) {
    promiseItems = orderModel.filterWithStatus(statues);
  } else {
    promiseItems = orderModel.getAllOrders();
  }

  promiseItems
    .then((items) => {
      res.render("manage-orders", {
        isUser: true,
        isAdmin: true,
        items: items,
        pageTitle: "Manage Orders",
      });
    })
    .catch((err) => next(err));
};

exports.getFilterEmail = (req, res, next) => {
  orderModel
    .filterWithEmail(req.query.email)
    .then((items) => {
      res.render("manage-orders", {
        isUser: true,
        isAdmin: true,
        items: items,
        pageTitle: "Manage Orders",
      });
    })
    .catch((err) => next(err));
};
