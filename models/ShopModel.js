const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your shop name"],
    },
    location: {
      type: String,
      required: [true, "please enter your shop location"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

shopSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});
shopSchema.virtual("products", {
  ref: "Product",
  foreignField: "shop",
  localField: "_id",
});

// shopSchema.pre(/^find/, function (next) {
//   this.populate("products");
//   next();
// });

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
