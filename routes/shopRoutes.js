const express = require("express");
const { createShop, getAllShops } = require("../controllers/ShopController");
const router = express.Router();

router.route("/").get(getAllShops).post(createShop);

module.exports = router;
