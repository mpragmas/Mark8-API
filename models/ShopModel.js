const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your shop name"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "a shop must have product"],
  },
});

shopSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  });
  next();
});

shopSchema.virtual("Store", {
  ref: "Store",
  foreignField: "shop",
  localField: "_id",
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
