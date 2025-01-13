const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(model.find(), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort();

    //console.log(features);

    const document = await features.query;
    // const products = await Product.find().sort("price");

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: document.length,
      data: {
        document,
      },
    });
  });

exports.getOne = (model) =>
  catchAsync(async (req, res, next) => {
    const product = await model.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: product,
    });
  });

exports.createOne = (model) =>
  catchAsync(async (req, res, next) => {
    const document = await model.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        document,
      },
    });
  });

exports.updateOne = (model) =>
  catchAsync(async (req, res) => {
    const product = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  });

exports.deleteOne = (model) =>
  catchAsync(async (req, res) => {
    await model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
