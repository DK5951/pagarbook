const mongoose = require('mongoose');
const httpStatus = require('http-status');
// const { toJSON } = require('./plugins');
const { StaffInfo } = require('.');

const ApiError = require('../utils/ApiError');

const { Schema } = mongoose;

const allowanceBonusSchema = new Schema(
  {
    staff: {
      type: mongoose.Types.ObjectId,
      ref: 'Staff',
    },
    date: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    discription: {
      type: String,
    },
    isAllowance: {
      type: Boolean,
    },
  },
  { timeStamp: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);

// eslint-disable-next-line
allowanceBonusSchema.pre('save', async function (next) {
  const { staff } = this;
  const getstaff = await StaffInfo.findById(staff);
  if (!getstaff) {
    throw new ApiError('No staff found with this id', httpStatus.BAD_REQUEST);
  }
  next();
});

const AllowBonus = mongoose.model('AllowBonus', allowanceBonusSchema);

module.exports = AllowBonus;
