const express = require("express");
const { getAllStores, createStore } = require("../controllers/storeController");
const router = express.Router();

router.route("/").get(getAllStores).post(createStore);

module.exports = router;
