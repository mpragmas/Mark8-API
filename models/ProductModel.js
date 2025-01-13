const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A product must have a name"],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("Shop", {
  ref: "Shop",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
