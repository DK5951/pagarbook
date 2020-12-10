const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createAccount = {
  body: Joi.object().keys({
    staff: Joi.objectId().required(),
    accountHolderName: Joi.string().required(),
    accountNumber: Joi.number().required(),
    confirmaccountNumber: Joi.number().required(),
    ifsc_Code: Joi.string().uppercase().required(),
  }),
};

const editAccount = {
  body: Joi.object().keys({
    accountHolderName: Joi.string(),
    accountNumber: Joi.number(),
    confirmaccountNumber: Joi.number(),
    ifsc_Code: Joi.string().uppercase(),
  }),
};
const getAccountById = {
  params: Joi.object({
    accountId: Joi.objectId().required(),
  }),
};
module.exports = {
  createAccount,
  editAccount,
  getAccountById,
};
