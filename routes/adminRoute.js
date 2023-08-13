const router = require("express").Router();
const check = require("express-validator").check;
const adminGuard = require("./guards/admin.guard");
const adminController = require("../Controllers/adminController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

router.get("/add", adminGuard, adminController.getAdd);

router.post(
  "/add",
  adminGuard,
  multer({
    storage: storage,
  }).single("image"),
  check("name").not().isEmpty().withMessage("name is required"),
  check("price")
    .not()
    .isEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0.0000000009 })
    .withMessage("price must be greater than 0"),
  check("description").not().isEmpty().withMessage("description is required"),
  check("category").not().isEmpty().withMessage("category is required"),
  check("image").custom((value, { req }) => {
    if (req.file) return true;
    else throw "image is required";
  }),
  adminController.postAdd
);

router.get("/manage/orders", adminGuard, adminController.getManageOrders);

// edit statues
router.post("/orders/update", adminGuard, adminController.updateStatus);

//filter orders
router.get("/filter/orders", adminGuard, adminController.getFilterOrders);

router.get("/filter/email", adminGuard, adminController.getFilterEmail);

module.exports = router;
