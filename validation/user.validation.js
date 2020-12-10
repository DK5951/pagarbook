const Joi = require('@hapi/joi');

const editUser = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
  }),
};

module.exports = {
  editUser,
};
