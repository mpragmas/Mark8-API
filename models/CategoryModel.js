const mongoose = require("mongoose");

categoriesSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categoriesSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "-passwordChangedAt -__v" });
  next();
});

//virtual
categoriesSchema.virtual("products", {
  ref: "Product",
  foreignField: "category",
  localField: "_id",
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
