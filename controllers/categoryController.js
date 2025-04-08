const Category = require("../models/CategoryModel");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./handlerFactory");

exports.getAllCategories = getAll(Category);
exports.getCategory = getOne(Category, { path: "products" });
exports.createCategory = createOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
