const httpStatus = require('http-status');
const { User } = require('../models/index');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const userService = require('./user.service');
/**
 * get otp random number
 */
const Generateotp = () => Math.floor(Math.random() * 10000);

const getOtpExpire = () => Date.now() + config.jwt.resetPasswordExpirationMinutes * 60 * 1000;

const Signup = async (mobileNumber) => {
  const user = await userService.getUserbyMobileNumber(mobileNumber);
  if (user) {
    throw new ApiError('MobileNumber is Register. ', httpStatus.BAD_REQUEST);
  }
  const otp = await Generateotp();
  const resetOtpExpire = await getOtpExpire();
  await User.create({ mobileNumber, otp, resetOtpExpire });
  return true;
};

const Login = async (mobileNumber) => {
  const user = await userService.getUserbyMobileNumber(mobileNumber);
  if (!user) {
    throw new ApiError('User is Note found.', httpStatus.BAD_REQUEST);
  }
  const otp = await Generateotp();
  user.otp = otp;
  user.resetOtpExpire = await getOtpExpire();
  await user.save();
  return true;
};
const Resend = async (mobileNumber) => {
  const user = await userService.getUserbyMobileNumber(mobileNumber);
  if (!user) {
    throw new ApiError('No MobileNumber found.', httpStatus.BAD_REQUEST);
  }
  const otp = await Generateotp();
  user.otp = otp;
  user.resetOtpExpire = await getOtpExpire();
  await user.save();
  return true;
};
const verifyOtp = async (mobileNumber, otp) => {
  let user = await userService.getUserbyMobaileOtp(mobileNumber, otp);
  if (!user) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  const istrue = await userService.otpIsExpire(user.resetOtpExpire);
  if (!istrue) {
    throw new ApiError('Otp is expire please try again', httpStatus.BAD_REQUEST);
  }
  user.otp = null;
  user.resetOtpExpire = null;
  user = await user.save();
  return user;
};

const setPassword = async (id, password) => {
  let user = await userService.getUserById(id);
  Object.assign(user, password);
  user.password = password;
  user = await user.save();
  return user;
};
module.exports = {
  Signup,
  Login,
  Resend,
  verifyOtp,
  setPassword,
};
