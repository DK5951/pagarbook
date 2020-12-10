const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createBonus = {
  body: Joi.object().keys({
    staff: Joi.objectId().required(),
    date: Joi.string().required(),
    Amount: Joi.number().required(),
    discription: Joi.string(),
    isAllowance: Joi.boolean().valid(false),
  }),
};
const createAllowance = {
  body: Joi.object().keys({
    staff: Joi.objectId().required(),
    date: Joi.string().required(),
    Amount: Joi.number().required(),
    discription: Joi.string(),
    isAllowance: Joi.boolean().valid(true),
  }),
};

const getBonus = {
  params: Joi.object().keys({
    bonusId: Joi.objectId().required(),
  }),
};

const getAllowance = {
  params: Joi.object().keys({
    allowanceId: Joi.objectId().required(),
  }),
};
const editBonus = {
  params: Joi.object().keys({
    bonusId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    date: Joi.string(),
    Amount: Joi.number(),
    discription: Joi.string(),
  }),
};
const editAllowance = {
  params: Joi.object().keys({
    allowanceId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    date: Joi.string(),
    Amount: Joi.number(),
    discription: Joi.string(),
  }),
};
module.exports = {
  createBonus,
  createAllowance,
  getAllowance,
  getBonus,
  editBonus,
  editAllowance,
};
