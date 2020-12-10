const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
Joi.objectId = require('joi-objectid')(Joi);

const punchin = {
  params: Joi.object().keys({
    staffId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    date: Joi.string().required(),
    punchin: Joi.object().keys({
      hours: Joi.number().required(),
      min: Joi.number().required(),
    }),
  }),
};
const punchout = {
  params: Joi.object().keys({
    staffId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    date: Joi.string().required(),
    punchout: Joi.object().keys({
      hours: Joi.number().required(),
      min: Joi.number().required(),
    }),
  }),
};
module.exports = {
  punchin,
  punchout,
};
