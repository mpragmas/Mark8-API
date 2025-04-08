const Product = require("./../models/ProductModel");

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./handlerFactory");

exports.getAllProducts = getAll(Product);
exports.getProduct = getOne(
  Product,
  { path: "category" },
  { path: "shop", select: "name location" }
);
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
