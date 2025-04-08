const Store = require("../models/StoreModel");
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require("./handlerFactory");

exports.getAllStores = getAll(Store);
exports.getStore = getOne(Store);
exports.createStore = createOne(Store);
exports.updateStore = updateOne(Store);
exports.deleteStore = deleteOne(Store);
