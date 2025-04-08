const mongoose = require("mongoose");
const Category = require("./CategoryModel");
const { validate } = require("./ShopModel");

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
    discountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          // 'this' refers to the current document
          return val < this.price;
        },
        message:
          "Discount price ({VALUE}) must be lower than the original price",
      },
    },
    description: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
    // category: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Category",
    // },
    category: {
      type: String,
      enum: ["Electronics", "Clothing", "Shoes", "Books", "Military"],
      required: [true, "A product must have a category"],
    },
    shop: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Shop",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.select(" -__v");

  next();
});

productSchema.pre("save", function (next) {
  if (!this.discountPrice) {
    this.discountPrice = this.price * 0.75; // 25% discount
  }
  next();
});
// productSchema.pre(/^find/, function (next) {
//   this.populate({ path: "category", select: "name location" });
//   next();
// });

// productSchema.virtual("Shop", {
//   ref: "Shop",
//   foreignField: "product",
//   localField: "_id",
// });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
