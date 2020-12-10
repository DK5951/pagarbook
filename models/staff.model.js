const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { toJSON } = require('./plugins');
const { Business } = require('.');
const ApiError = require('../utils/ApiError');

const { Schema } = mongoose;

const StaffSchema = new Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    staffName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      validate: /^\d{10}$/,
      unique: true,
    },
    salaryInfo: {
      salaryType: {
        type: String,
        enum: ['PerhourBasis', 'Monthly', 'Daily', 'Work base', 'Weekly'],
        require: true,
      },
      salary: {
        type: Number,
        require: true,
      },
      salaryCycle: {
        type: String,
        require: true,
      },
    },
    Payment: {
      type: {
        type: String,
        enum: ['Advance', 'Pending'],
        require: true,
      },
      Amount: {
        type: Number,
        default: 0,
        require: true,
      },
    },
    status: {
      type: String,
      enum: ['Activate', 'Deactivate'],
      default: 'Activate',
      required: true,
    },
    shiftHours: {
      hours: {
        type: Number,
        default: 5,
        minlength: 12,
      },
      min: {
        type: Number,
        default: 0,
        minlength: 60,
      },
    },
  },
  { timeStamp: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);
StaffSchema.plugin(toJSON);
StaffSchema.pre('save', async function (next) {
  const { business } = this;
  const getbusiness = await Business.findById(business);
  if (!getbusiness) {
    throw new ApiError('No business found with this id', httpStatus.BAD_REQUEST);
  }
  next();
});

// StaffSchema.methods.getTimes = function () {
//   let totalTime = this.shiftHours.hours * 60 * 60 * 1000;
//   totalTime += this.shiftHours.min * 60 * 1000;
//   return time;
// };

const Staff = mongoose.model('staff', StaffSchema);

module.exports = Staff;
