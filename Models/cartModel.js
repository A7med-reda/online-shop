const mongoose = require("mongoose");
let db_url = "mongodb+srv://ahmedelshehapy0:AhmedNodejs@cluster0.tbjnxqm.mongodb.net/online-shop?retryWrites=true&w=majority";
// let db_url = "mongodb://localhost:27017/online-Shop";
mongoose.set("strictQuery", false);

// schema cart object for every product
let cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  email: String,
  productId: String,
  timestamp: Number,
});

let cartItem = mongoose.model("cart", cartSchema);

// used in different places (button orderAll  - display in cart )
exports.getItemByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartItem.find({ userId: userId }).sort({ timestamp: 1 });
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartItem.findOneAndUpdate(
          { productId: data.productId, userId: data.userId },
          {
            $inc: { amount: data.amount },
          }
        );
      })
      .then((result) => {
        if (!result) {
          let item = new cartItem(data);
          return item.save();
        }
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

exports.editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartItem.updateOne({ _id: id }, newData);
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => cartItem.findByIdAndDelete({ _id: id }))
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

exports.deleteAll = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => cartItem.deleteMany({ userId: userId }))
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

// to access collection of cart from orderController
exports.getItemById = (productId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartItem.findById(productId);
      })
      .then((item) => {
        mongoose.disconnect();
        resolve(item);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

// to access collection of cart from orderController and get all cart item
exports.getAllItemByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartItem.find(userId);
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
