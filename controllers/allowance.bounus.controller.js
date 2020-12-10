const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { allowBounsService } = require('../services');
const ApiError = require('../utils/ApiError');

const createalloBouns = catchAsync(async (req, res) => {
  const alloBouns = await allowBounsService.createAlloBonus(req.body);
  return res.status(httpStatus.CREATED).json({ status: 'success', alloBouns });
});

const editBonus = catchAsync(async (req, res) => {
  const { bonusId } = req.params;
  let bonus = await allowBounsService.getBonusByid(bonusId);
  if (!bonus) {
    throw new ApiError('No bonus found.', httpStatus.BAD_REQUEST);
  }
  bonus = await allowBounsService.editAllowance(bonusId, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', bonus });
});
const editAllowance = catchAsync(async (req, res) => {
  const { allowanceId } = req.params;
  let allowance = await allowBounsService.getAllowanceByid(allowanceId);
  if (!allowance) {
    throw new ApiError('No allowance found.', httpStatus.BAD_REQUEST);
  }
  allowance = await allowBounsService.editallBonus(allowanceId, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', allowance });
});

const removeBouns = catchAsync(async (req, res) => {
  const { bonusId } = req.params;
  const bonus = await allowBounsService.getBonusByid(bonusId);
  if (!bonus) {
    throw new ApiError('No bonus found.', httpStatus.BAD_REQUEST);
  }
  await allowBounsService.removeAlloBonus(bonusId);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success' });
});
const removeAllowance = catchAsync(async (req, res) => {
  const { allowanceId } = req.params;
  const allowance = await allowBounsService.getAllowanceByid(allowanceId);
  if (!allowance) {
    throw new ApiError('No allowance found.', httpStatus.BAD_REQUEST);
  }
  await allowBounsService.removeAlloBonus(allowanceId);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success' });
});

const getAllowance = catchAsync(async (req, res) => {
  const { allowanceId } = req.params;
  const allowance = await allowBounsService.getAllowanceByid(allowanceId);
  if (!allowance) {
    throw new ApiError('No Allowance found.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', allowance });
});

const getBonus = catchAsync(async (req, res) => {
  const { bonusId } = req.params;
  const bonus = await allowBounsService.getBonusByid(bonusId);
  if (!bonus) {
    throw new ApiError('No bonus found.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', bonus });
});

module.exports = {
  createalloBouns,
  editBonus,
  removeBouns,
  getAllowance,
  getBonus,
  editAllowance,
  removeAllowance,
};
