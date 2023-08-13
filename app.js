const express = require("express");
const app = express();
const session = require("express-session");
const { error } = require("console");
const { nextTick } = require("process");
// to save session on mongodb
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const path = require("path");
const homeRouter = require("./routes/homeRoute");
const productRouter = require("./routes/productRoute");
const authRouter = require("./routes/authRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const adminRouter = require("./routes/adminRoute");
const { error } = require("console");
const { nextTick } = require("process");
// serve static Files
app.use(express.static(path.join(__dirname, "/Assets")));
app.use(express.static(path.join(__dirname, "/image")));

// set in mongodb to  store sessionS
const STORE = new SessionStore({
  uri: "mongodb+srv://ahmedelshehapy0:AhmedNodejs@cluster0.tbjnxqm.mongodb.net/online-shop?retryWrites=true&w=majority",
  // uri: "mongodb://localhost:27017/online-Shop",
  collection: "sessions",
});

//create session
//add to req.session
app.use(
  session({
    secret: "hello Amigo this secret im live in the dark here ",
    saveUninitialized: false,
    // deprecated error
    resave: false,
    cookie: {
      // path: "/",
      // httpOnly: true,
      // secure: false,
      maxAge: 1000 * 60 * 60 * 24, // one day
    },
    //default in ram
    store: STORE,
  })
);
//render error in array  ,  transfer data between deferent requests
app.use(flash());

// set template engine
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/admin", adminRouter);

// app.get("/error", (req, res, next) => {
//   res.status(500);
//   res.render("error", {
//     isUser: req.session.isUser,
//     isAdmin: req.session.isAdmin,
//     title: "Error",
//   });
// });

app.get("/not-admin", (req, res, next) => {
  res.status(403);
  res.render("not-admin", {
    isUser: req.session.isUser,
    isAdmin: false,
    title: "NoT Admin",
  });
});
// //  default error handling
// app.use((error, req, res, next) => {
//   res.redirect("/error");
// });

app.use((req, res, next) => {
  res.status(404);
  res.render("not-found", {
    isUser: req.session.isUser,
    isAdmin: req.session.isAdmin,
    pageTitle: "page not Found",
  });
});

app.listen(process.env.PORT  || 8080, () => {
  console.log("Express is On");
});
