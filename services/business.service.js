const httpStatus = require('http-status');
const { Business } = require('../models/index');
const ApiError = require('../utils/ApiError');

const getBusinessByid = async (id) => {
  const business = await Business.findById(id);
  if (!business) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  return business;
};
const getBusiness = async (id) => {
  const bussiness = Business.find({ user: id });
  return bussiness;
};
const getBusinessbyidAndUpdate = async (id, body) => {
  let business = await getBusinessByid(id);
  if (!business) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  Object.assign(business, body);
  business = await business.save();
  return business;
};

const setBusiness = async (body) => {
  const bussiness = await Business.create(body);
  return bussiness;
};

const editBusiness = async (id, body) => {
  // eslint-disable-next-line
  return await getBusinessbyidAndUpdate(id, body);
};

const deleteBusiness = async (id) => {
  const business = await getBusinessByid(id);
  if (!business) {
    throw new ApiError('No user Found', httpStatus.BAD_REQUEST);
  }
  await Business.findByIdAndRemove(id);
};

module.exports = {
  setBusiness,
  editBusiness,
  deleteBusiness,
  getBusiness,
  getBusinessByid,
};
