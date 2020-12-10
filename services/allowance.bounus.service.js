const httpStatus = require('http-status');
const { AllowanseBonus } = require('../models/index');
const ApiError = require('../utils/ApiError');

const getallBonus = async (id) => {
  // eslint-disable-next-line
  return await AllowanseBonus.findById(id);
};

const getallBonusByStaffId = async (staffId) => {
  // eslint-disable-next-line
  return await AllowanseBonus.find({  staff:staffId})
};

const getBonusByid = async (id) => {
  // eslint-disable-next-line
  return await AllowanseBonus.findOne({ _id: id, isAllowance: false });
};
const getAllowanceByid = async (id) => {
  // eslint-disable-next-line
  return await AllowanseBonus.findOne({ _id: id, isAllowance: true });
};

const createAlloBonus = async (body) => {
  // eslint-disable-next-line
  return await AllowanseBonus.create(body);
};

const editBonus = async (id, body) => {
  const bonus = await getallBonus(id);
  if (!bonus) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  Object.assign(bonus, body);
  // eslint-disable-next-line
  return await bonus.save();
};

const editallBonus = async (id, body) => {
  const bonus = await getallBonus(id);
  Object.assign(bonus, body);
  // eslint-disable-next-line
  return await bonus.save();
};
const removeAlloBonus = async (id) => {
  // eslint-disable-next-line
    return await AllowanseBonus.findByIdAndRemove(id);
};

module.exports = {
  getBonusByid,
  createAlloBonus,
  editallBonus,
  removeAlloBonus,
  getAllowanceByid,
  editBonus,
  getallBonusByStaffId,
};
