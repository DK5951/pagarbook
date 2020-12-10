const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createHirePost = {
  body: Joi.object().keys({
    business: Joi.objectId().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.number().required(),
    status: Joi.string().valid('Activate', 'Deactivate').required(),
  }),
};

const HirePostid = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
};
const editHirePost = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    salary: Joi.number(),
    status: Joi.string().valid('Activate', 'Deactivate'),
  }),
};
const HirePostStatus = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};

module.exports = {
  createHirePost,
  HirePostid,
  editHirePost,
  HirePostStatus,
};
