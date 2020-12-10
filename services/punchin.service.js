const httpStatus = require('http-status');
const { Punchin } = require('../models/index');
const ApiError = require('../utils/ApiError');

const getPunchinByid = async (id) => {
  // eslint-disable-next-line
    return await Punchin.findById(id);
};
const getsatffByIdAndDate = async (id, date) => {
  // eslint-disable-next-line
     return await Punchin.findOne({ staff: id, date });
};

const getPunchinByidAndRemove = async (id) => {
  // eslint-disable-next-line
     return await Punchin.findByIdAndRemove(id)
};

const editPunchin = async (id, body) => {
  if (body.date) {
    const isValidDate = await getsatffByIdAndDate(id, body.date);
    if (!isValidDate) {
      throw new ApiError(' No Recoed Found in Date .', httpStatus.BAD_REQUEST);
    }
    await Object.assign(isValidDate, body);
    // eslint-disable-next-line
    return await isValidDate.save();
  }
};
module.exports = {
  getPunchinByid,
  getsatffByIdAndDate,
  getPunchinByidAndRemove,
  editPunchin,
};
