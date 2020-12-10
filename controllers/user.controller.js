const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const getuserbyId = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const user = await userService.getUserById(_id);
  if (!user) {
    throw new ApiError('No User Found.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', data: user });
});

const edituserbyId = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const user = await userService.getbyidAndUpdate(_id, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', data: user });
});

module.exports = {
  getuserbyId,
  edituserbyId,
};
