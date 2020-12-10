const Joi = require('@hapi/joi');

const signup = {
  body: Joi.object().keys({
    mobileNumber: Joi.number().required(),
  }),
};
const VerifyOtp = {
  body: Joi.object().keys({
    mobileNumber: Joi.number().required(),
    otp: Joi.number().required(),
  }),
};
const setPassword = {
  body: Joi.object().keys({
    mobileNumber: Joi.number().required(),
    otp: Joi.number().required(),
    password: Joi.string().required(),
  }),
};
const login = {
  body: Joi.object().keys({
    mobileNumber: Joi.number().required(),
    // otp:Joi.number().required(),
  }),
};
module.exports = {
  signup,
  VerifyOtp,
  setPassword,
  login,
};
