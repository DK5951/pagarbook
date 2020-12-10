const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { accountService } = require('../services');
const ApiError = require('../utils/ApiError');

const setAccount = catchAsync(async (req, res) => {
  const account = await accountService.createAccount(req.body);
  return res.status(httpStatus.CREATED).json({ status: 'success', account });
});

const editAccount = catchAsync(async (req, res) => {
  const id = req.params.accountId;
  const account = await accountService.editAccount(id, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', account });
});

const deleteAccount = catchAsync(async (req, res) => {
  const id = req.params.accountId;
  const account = await accountService.deleteAccount(id);
  return res.status(httpStatus.NO_CONTENT).json({ status: 'success', account });
});
const getAccountbyId = catchAsync(async (req, res) => {
  const id = req.params.accountId;
  const account = await accountService.getAccountbyId(id);
  if (!account) {
    throw new ApiError('Account note found.', httpStatus.BAD_REQUEST);
  }
  return res.status(httpStatus.OK).json({ status: 'success', account });
});

module.exports = {
  setAccount,
  editAccount,
  deleteAccount,
  getAccountbyId,
};
