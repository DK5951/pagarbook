const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { toJSON } = require('./plugins');
const { StaffInfo } = require('.');
const ApiError = require('../utils/ApiError');

const { Schema } = mongoose;

const punchinSchema = new Schema(
  {
    staff: {
      type: mongoose.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    punchin: {
      hours: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    punchout: {
      hours: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      default: 'Present',
      enum: ['Present', 'Half day', 'Absent', 'Add Overtime', 'Late find', 'Paid Holiday', 'Write note'],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);

punchinSchema.plugin(toJSON);

punchinSchema.pre('save', async function (next) {
  const { staff } = this;
  const getbusiness = await StaffInfo.findById(staff);
  if (!getbusiness) {
    throw new ApiError('No staff found with this id', httpStatus.BAD_REQUEST);
  }
  next();
});

const Punchin = mongoose.model('Punchin', punchinSchema);

module.exports = Punchin;
