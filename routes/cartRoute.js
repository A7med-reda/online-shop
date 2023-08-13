const router = require("express").Router();
const cartController = require("../Controllers/cartController");
const authGuard = require("./guards/auth.guard");
const check = require("express-validator").check;
// /cart/
router.get("/", authGuard.isAuth, cartController.getCart);

router.post(
  "/",
  authGuard.isAuth,
  check("amount")
    .notEmpty()
    .withMessage("Amount is Required")
    .isInt({ min: 1 })
    .withMessage("Amount Cant be less than 1"),
  cartController.postCart
);
// update amount from /cart
router.post(
  "/save",
  authGuard.isAuth,
  check("amount")
    .notEmpty()
    .withMessage("Amount is Required")
    .isInt({ min: 1 })
    .withMessage("Amount Cant be less than 1"),
  cartController.postSave
);

router.post("/delete", authGuard.isAuth, cartController.postDelete);

router.post("/deleteAll", authGuard.isAuth, cartController.postDeleteAll);

module.exports = router;
