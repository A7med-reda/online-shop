const router = require("express").Router();
const productController = require("../Controllers/productController");
// show first  product // handel Error 
//  /product/id
router.get("/", productController.getFirstProduct);
router.get("/:id", productController.getProductById);

module.exports = router;
