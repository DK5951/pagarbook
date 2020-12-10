const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { punchinService } = require('../services');
// const ApiError = require('../utils/ApiError');

const editPunchinById = catchAsync(async (req, res) => {
  const punchin = await punchinService.editPunchin(req.params.staffId, req.body);
  return res.status(httpStatus.OK).json({ status: 'success', punchin });
});
module.exports = {
  editPunchinById,
};
