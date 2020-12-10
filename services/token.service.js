const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @returns {string} token
 */
const generateToken = (
  userId,
  expires = config.jwt.resetPasswordExpirationMinutes * 60 * 1000,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
  };
  const token = jwt.sign(payload, secret, { expiresIn: expires });
  return token;
};

/**
 * Verify token if valid then return userObject
 * @param {String} token
 * @return {Object}
 * */
const verifyToken = async (token, secret = config.jwt.secret) => {
  const payload = jwt.verify(token, secret);
  const user = await User.findOne({ _id: payload.sub });
  if (!user) {
    throw new ApiError('Invalid token', httpStatus.UNAUTHORIZED);
  }
  return user;
};

module.exports = {
  generateToken,
  verifyToken,
};
