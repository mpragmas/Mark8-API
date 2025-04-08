const Shop = require("../models/ShopModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlerFactory");

exports.getAllShops = getAll(Shop);
exports.getShop = getOne(Shop, "products");
exports.createShop = createOne(Shop);
exports.updateShop = updateOne(Shop);
exports.deleteShop = deleteOne(Shop);
