const productModel = require("../Models/productsModel");

exports.getHomeAndCategory = (req, res, next) => {
  // console.log(req.session.userId);
  // --get home page
  //  get Products
  //  render index

  //   get category
  //   if category (!undfined) && category !==all
  //         filter
  //   else
  //         render get home
  let category = req.query.category;
  // validation
  let validCategory = ["cloths", "phones", "electronics", "kitchens", "test"];
  let promiseProduct;
  if (category && validCategory.includes(category)) {
    promiseProduct = productModel.getProductsByCategory(category);
  } else {
    promiseProduct = productModel.getAllProducts();
  }
  promiseProduct
    .then((products) => {
      res.render("index", {
        products: products,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationsError: req.flash("validationsError")[0],
        pageTitle : "Home"

      });
    })
    .catch((err) => {
      next(err);
    });
};
