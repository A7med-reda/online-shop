const mongoose = require("mongoose");
let db_url =
  "mongodb+srv://ahmedelshehapy0:AhmedNodejs@cluster0.tbjnxqm.mongodb.net/online-shop?retryWrites=true&w=majority";

// let db_url = "mongodb://localhost:27017/online-Shop";
mongoose.set("strictQuery", false);
let productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
});
let product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
  // connect to db
  //  get product
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return product.find();
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getProductsByCategory = (category) => {
  // connect to db
  //  get product by category
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return product.find({ category: category });
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getProductsById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return product.findById(id);
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getFirstProduct = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return product.findOne();
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

// add new product -> admin
exports.addNewProduct = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        let newProduct = new product(data);
        return newProduct.save();
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
