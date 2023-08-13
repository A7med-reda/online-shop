const { reject } = require("lodash");
const cartModel = require("../Models/cartModel");

const mongoose = require("mongoose");
let db_url =
  "mongodb+srv://ahmedelshehapy0:AhmedNodejs@cluster0.tbjnxqm.mongodb.net/online-shop?retryWrites=true&w=majority";

// let db_url = "mongodb://localhost:27017/online-Shop";
mongoose.set("strictQuery", false);

let orderSchema = mongoose.Schema({
  userId: String,
  productId: String,
  name: String,
  price: Number,
  amount: Number,
  total: Number,
  email: String,
  address: String,
  status: {
    type: String,
    default: "pending",
  },
  timestamp: Number,
});

const Order = mongoose.model("order", orderSchema);

exports.addNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    // 1- delete item from cart by id of doc
    cartModel.deleteItem(data.cartId).then(() => {
      mongoose
        .connect(db_url)
        .then(() => {
          // change timeStamp
          data.timestamp = Date.now();
          let newOrder = new Order(data);
          return newOrder.save();
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
  });
};

exports.getOrderByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.find({ userId: userId }).sort({ timestamp: 1 });
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

exports.cancelOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.findByIdAndDelete(orderId);
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
exports.cancelAllOrder = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.deleteMany({ userId: userId });
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

//manage-orders
exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.find().sort({ timestamp: 1 });
      })
      .then((allOrders) => {
        mongoose.disconnect();
        resolve(allOrders);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.updateStatus = (data, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.updateOne(
          { _id: data._id, productId: data.productId },
          { $set: { status: newData } }
        );
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

// filter orders
exports.filterWithStatus = (value) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.find({ status: value });
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
exports.filterWithEmail = (value) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Order.find({ email: value });
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
