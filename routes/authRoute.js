const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const check = require("express-validator").check;
const authGuard = require("./guards/auth.guard");

router.get("/signup", authGuard.notAuth, authController.getSignup);
router.post(
  "/signup",
  authGuard.notAuth,
  check("username").notEmpty().withMessage("username is Required "),
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("invalid Email Format"),
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("password length at least 6 character "),
  check("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) {
      return true;
    } else {
      throw " Wrong Confirmed password";
    }
  }),
  authController.postSignup
);
router.get("/login", authGuard.notAuth, authController.getLogin);

router.post(
  "/login",
  authGuard.notAuth, // till now not have have session.userId 
  check("email")
    .notEmpty()
    .withMessage("Email Cant be Empty")
    .isEmail()
    .withMessage("invalid Format"),
  check("password")
    .notEmpty()
    .withMessage("password cant be Empty")
    .isLength({ min: 6 })
    .withMessage("Password character at least 6 "),
  authController.postLogin
);
router.all("/logout", authGuard.isAuth, authController.logout);
module.exports = router;
