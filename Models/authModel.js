const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let db_url =
  "mongodb+srv://ahmedelshehapy0:AhmedNodejs@cluster0.tbjnxqm.mongodb.net/online-shop?retryWrites=true&w=majority";
// let db_url = "mongodb://localhost:27017/online-Shop";
mongoose.set("strictQuery", false);

let signupSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

let User = mongoose.model("user", signupSchema);

exports.createNewUser = (username, email, password) => {
  //connect mongoose
  // check if email exist or not
  // hashPassword
  // create user
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((userEmail) => {
        if (userEmail) {
          reject("This Email is Used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashPassword) => {
        let user = new User({
          userName: username,
          email: email,
          password: hashPassword,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.Login = (email, password) => {
  //check for email
  // no  --> error
  // yes --> check for password
  // no --> error
  // yes --> set session (app.js) ( track to all user req  because http is stateless  , send cooke with session id )
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("No Match For This Email");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("Incorrect Password");
            } else {
              //  session
              mongoose.disconnect();
              resolve({
                id: user._id,
                isAdmin: user.isAdmin,
                email: user.email,
              });
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
