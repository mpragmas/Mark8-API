const Shop = require("../models/ShopModel");
const { createOne, getAll } = require("./handlerFactory");

exports.getAllShops = getAll(Shop);
exports.createShop = createOne(Shop);
