const productModel = require("../Models/productsModel");

exports.getProductById = (req, res, next) => {
  let id = req.params.id;
  productModel
    .getProductsById(id)
    .then((product) => {
      res.render("product", {
        product,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationsError: req.flash("validationsError")[0],
        pageTitle: "Product",
      });
    })
    .catch((err) => {
      next(err);
      
    });
};

exports.getFirstProduct = (req, res, next) => {
  productModel
    .getFirstProduct()
    .then((product) => {
      res.render("product", {
        product,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationsError: req.flash("validationsError")[0],
        pageTitle: "Product",
      });
    })
    .catch((err) => {
      next(err);
    });
};
