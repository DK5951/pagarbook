const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get User by Id
 * @param {id} userId
 * @returns {Promise<User>>}
 */
const getUserById = async (id) => {
  return User.findOne({ _id: id });
};

/**
 * Get users
 * @returns {Promise<User>}
 */
const getUsers = async () => {
  return User.find({});
};

/**
 * Get User by Mobile number
 * @param {number} User mobilenumber
 * @returns {Promise<User>}
 */
const getUserbyMobileNumber = async (mobileNumber) => {
  // eslint-disable-next-line
  return await User.findOne({ mobileNumber });
};

const getUserbyMobaileOtp = async (mobileNumber, otp) => {
  // eslint-disable-next-line
  return await User.findOne({ mobileNumber, otp });
};
const otpIsExpire = async (expireDate) => {
  return (await expireDate) >= Date.now();
};

const getbyidAndUpdate = async (id, body) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  Object.assign(user, body);
  // eslint-disable-next-line
  return await user.save();
};
const deletePassword = async (id) => {
  await User.findByIdAndUpdate(id, { password: null }, { new: true });
  return true;
};
module.exports = {
  getUserById,
  getUserbyMobileNumber,
  getUsers,
  getUserbyMobaileOtp,
  getbyidAndUpdate,
  otpIsExpire,
  deletePassword,
};
