const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { businessService } = require('../services');

const createBusiness = catchAsync(async (req, res) => {
  req.body.user = req.user._id;
  const business = await businessService.setBusiness(req.body);
  return res.status(httpStatus.CREATED).json({ status: 'success', business });
});

const addBusiness = catchAsync(async (req, res) => {
  req.body.isSubbusiness = req.params.businessId;
  req.body.user = req.user._id;
  const business = await businessService.setBusiness(req.body);
  return res.status(httpStatus.CREATED).json({ status: 'success', business });
});

const editBusiness = catchAsync(async (req, res) => {
  const business = await businessService.editBusiness(req.params.businessId, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', business });
});
const deleteBusiness = catchAsync(async (req, res) => {
  await businessService.deleteBusiness(req.params.businessId);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success' });
});
const getBusinessbyid = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessByid(req.params.businessId);
  return res.status(httpStatus.OK).json({ status: 'success', business });
});
const getBusiness = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const business = await businessService.getBusiness(_id);
  return res.status(httpStatus.OK).json({ status: 'success', business });
});
module.exports = {
  createBusiness,
  editBusiness,
  deleteBusiness,
  getBusinessbyid,
  getBusiness,
  addBusiness,
};
