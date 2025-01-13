const Store = require("../models/StoreModel");
const { getAll, getOne, updateOne, deleteOne } = require("./handlerFactory");

exports.getAllStores = getAll(Store);
exports.getStore = getOne(Store);
exports.updateStore = updateOne(Store);
exports.deleteStore = deleteOne(Store);
