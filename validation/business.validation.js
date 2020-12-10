const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

const createBusiness = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    businessName: Joi.string().required(),
    salaryType: Joi.string().valid('CalendarMonth', 'NormalMonth').required(),
    ShiftHo: Joi.object().keys({
      ho: Joi.number().required(),
      min: Joi.number(),
    }),
  }),
};
const addBusiness = {
  params: Joi.object().keys({
    businessId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    businessName: Joi.string().required(),
    salaryType: Joi.string().valid('CalendarMonth', 'NormalMonth').required(),
    ShiftHo: Joi.object().keys({
      ho: Joi.number().default('00').required(),
      min: Joi.number().default('00'),
    }),
  }),
};
const editBusiness = {
  params: Joi.object().keys({
    businessId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    businessName: Joi.string(),
    status: Joi.string().valid('Activate', 'Deactivate'),
  }),
};
const deleteBusiness = {
  params: Joi.object().keys({
    businessId: Joi.objectId().required(),
  }),
};
module.exports = {
  createBusiness,
  addBusiness,
  editBusiness,
  deleteBusiness,
};
