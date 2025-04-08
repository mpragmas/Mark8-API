const User = require("../models/UserModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1. create error if user password data

  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "this route is not for password updates. Please use /updateMypassword.",
        400
      )
    );

  //2. update user doc
  //filter body or any user can change to admin😂
  //filter unwanted
  const filteredBody = filterObj(req.body, "name", "email");

  //3. updateuser
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // const user = await User.findById(req.user.id);
  // user.name = 'jonas';
  // await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
  /*
  Summary:
If you need complete validation and triggering of middlewares (like password hashing or other important logic), use the user.save() approach.
If you only need a simple, efficient update with basic validation and you don't rely on pre-save hooks, the findByIdAndUpdate version will work just fine.
  */
  /*
  const user = await User.findById(req.user.id);
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  await user.save({ validateBeforeSave: true }); // Ensures validation is run*/
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not  defined! please use /signup instead",
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do not update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
