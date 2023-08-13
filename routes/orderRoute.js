const router = require("express").Router();
const orderController = require("../Controllers/orderController");
const authGuard = require("./guards/auth.guard");
const check = require("express-validator").check;

router.get("/verify-order", orderController.getVerifyOrder);

router.get("/", authGuard.isAuth, orderController.getOrders);

router.post(
  "/",
  authGuard.isAuth,
  check("address")
    .notEmpty()
    .withMessage("please Enter your Address")
    .isString()
    .withMessage("Address Form Not Valid"),
  orderController.postOrder
);

router.post("/cancel", authGuard.isAuth, orderController.postCancel);
router.post("/deleteAll", authGuard.isAuth, orderController.postCancelAll);

module.exports = router;
