const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
Joi.objectId = require('joi-objectid')(Joi);

const createStaff = {
  body: Joi.object().keys({
    business: Joi.objectId().required(),
    staffName: Joi.string().required(),
    mobileNumber: Joi.number(),
    salaryInfo: Joi.object().keys({
      salaryType: Joi.string().valid('PerhourBasis', 'Monthly', 'Daily', 'Work base', 'Weekly').required(),
      salary: Joi.number().required(),
      salaryCycle: Joi.date().format('YYYY-MM-DD').raw().required(),
    }),
    Payment: Joi.object().keys({
      type: Joi.string().default('Advance').valid('Advance', 'Pending').required(),
      Amount: Joi.number().required(),
    }),
    status: Joi.string().default('Activate').valid('Activate', 'Deactivate'),
    shiftHours: Joi.object().keys({
      hours: Joi.number(),
      min: Joi.number(),
    }),
  }),
};

const editStaffbyId = {
  body: Joi.object().keys({
    staffName: Joi.string(),
    mobileNumber: Joi.number(),
    salaryInfo: Joi.object().keys({
      salaryCycle: Joi.date().format('YYYY-MM-DD').raw().required(),
    }),
    shiftHours: Joi.string(),
  }),
};

const getallStaff = {
  params: Joi.object().keys({
    businessId: Joi.objectId().required(),
  }),
};

const StaffbyId = {
  params: Joi.object().keys({
    staffId: Joi.objectId().required(),
  }),
};

const StaffStatus = {
  params: Joi.object().keys({
    staffId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};

module.exports = {
  createStaff,
  getallStaff,
  StaffStatus,
  StaffbyId,
  editStaffbyId,
};
