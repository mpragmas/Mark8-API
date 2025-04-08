const express = require("express");

const {
  createShop,
  getAllShops,
  getShop,
  updateShop,
  deleteShop,
} = require("../controllers/ShopController");

const router = express.Router();

router.route("/").get(getAllShops).post(createShop);
router.route("/:id").get(getShop).patch(updateShop).delete(deleteShop);

module.exports = router;
