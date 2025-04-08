const express = require("express");
const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategory)
  .post(updateCategory)
  .delete(deleteCategory);

module.exports = router;
