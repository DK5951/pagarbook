const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { toJSON } = require('./plugins');
const { StaffInfo } = require('.');
const ApiError = require('../utils/ApiError');

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    staff: {
      type: mongoose.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      validate: /^\d{11}$/,
      required: true,
    },
    ifsc_Code: {
      type: String,
      uppercase: true,
      require: true,
    },
  },
  { timeStamp: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);
accountSchema.plugin(toJSON);
accountSchema.pre('save', async function (next) {
  const { staff } = this;
  const getstaff = await StaffInfo.findById(staff);
  if (!getstaff) {
    throw new ApiError('No staff found with this id', httpStatus.BAD_REQUEST);
  }
  next();
});
const Account = mongoose.model('account', accountSchema);

module.exports = Account;
