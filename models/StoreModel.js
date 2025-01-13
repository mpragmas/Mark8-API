const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "store must have a name"],
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: "Shop",
    required: [true, "store must have a shop"],
  },
});

storeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "shop",
  });
  next();
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
