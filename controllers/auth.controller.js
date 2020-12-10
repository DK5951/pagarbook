const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');

const Signup = catchAsync(async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await authService.Signup(mobileNumber);
  return res.status(httpStatus.CREATED).json({ status: 'success', user });
});
const Login = catchAsync(async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await authService.Login(mobileNumber);
  return res.status(httpStatus.OK).json({ status: 'success', user });
});
const Resend = catchAsync(async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await authService.Resend(mobileNumber);
  return res.status(httpStatus.OK).json({ status: 'success', user });
});
const verifyUserByOtp = catchAsync(async (req, res) => {
  const { mobileNumber, otp } = req.body;
  const user = await authService.verifyOtp(mobileNumber, otp);
  const token = await tokenService.generateToken(user._id);

  return res.status(httpStatus.OK).json({ status: 'success', data: { user, token } });
});
const setPassword = catchAsync(async (req, res) => {
  const { mobileNumber, otp, password } = req.body;
  const user = await authService.verifyOtp(mobileNumber, otp);
  await authService.setPassword(user._id, password);
  return res.status(httpStatus.OK).json({ status: 'success' });
});

const deletePassword = catchAsync(async (req, res) => {
  const { mobileNumber, otp } = req.body;
  const user = await authService.verifyOtp(mobileNumber, otp);
  await userService.deletePassword(user._id);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success' });
});
module.exports = {
  Signup,
  Login,
  Resend,
  verifyUserByOtp,
  setPassword,
  deletePassword,
};
