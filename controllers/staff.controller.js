const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { staffService } = require('../services');
const ApiError = require('../utils/ApiError');

const createStaff = catchAsync(async (req, res) => {
  const staff = await staffService.createStaff(req.body);
  return res.status(httpStatus.CREATED).json({ status: 'success', staff });
});

const getStaffbyid = catchAsync(async (req, res) => {
  const staff = await staffService.getstaffByid(req.params.staffId);
  if (!staff) {
    throw new ApiError('No Staff Found This id.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', staff });
});
const deleteStaffbyId = catchAsync(async (req, res) => {
  const staff = await staffService.getstaffByid(req.params.staffId);
  if (!staff) {
    throw new ApiError('No Staff Found This id.', httpStatus.BAD_REQUEST);
  }
  await staffService.deleteStaffbyid(staff._id);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success' });
});

const editStaffbyId = catchAsync(async (req, res) => {
  const staff = await staffService.getStaffbyidAndUpdate(req.params.staffId, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', staff });
});

const getallStaff = catchAsync(async (req, res) => {
  const staff = await staffService.getallStaff(req.params.businessId);
  if (!staff) {
    throw new ApiError('Staff is empty', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', staff });
});
const staffStatus = catchAsync(async (req, res) => {
  const id = req.params.staffId;
  const { status } = req.body;
  const staff = await staffService.staffStatus(id, status);
  return res.status(httpStatus.OK).json({ status: 'success', staff });
});
const getSalaryCalculationOfparticularStaff = catchAsync(async (req, res) => {
  const id = req.params.staffId;
  const payment = await staffService.getSalaryCalculationOfparticularStaff(id);
  if (!payment) {
    throw new ApiError('Some thing is wrong', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', payment });
});

const getTotalSalaryCalculationOfparticularStaff = catchAsync(async (req, res) => {
  const id = req.params.staffId;
  const payment = await staffService.getTotalSalaryCalculationOfparticularStaff(id);
  if (!payment) {
    throw new ApiError('Some thing is wrong', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', payment });
});

const allStaffSalaryStatus = catchAsync(async (req, res) => {
  const payment = await staffService.allStaffSalaryStatus();
  if (!payment) {
    throw new ApiError('Some thing is wrong', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', payment });
});

module.exports = {
  createStaff,
  getStaffbyid,
  deleteStaffbyId,
  editStaffbyId,
  staffStatus,
  getallStaff,
  getSalaryCalculationOfparticularStaff,
  getTotalSalaryCalculationOfparticularStaff,
  allStaffSalaryStatus,
};
