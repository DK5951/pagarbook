const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { toJSON } = require('./plugins');
const { User } = require('.');
const ApiError = require('../utils/ApiError');

const { Schema } = mongoose;

const businessSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  businessName: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Activate', 'Deactivate'],
    default: 'Activate',
    required: true,
  },
  salaryType: {
    type: String,
    enum: ['CalendarMonth', 'NormalMonth'],
    default: 'NormalMonth',
    required: true,
  },
  ShiftHo: {
    ho: {
      type: Number,
      default: 6,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  isSubbusiness: {
    type: mongoose.Types.ObjectId,
    ref: 'Business',
  },
});
businessSchema.plugin(toJSON);

businessSchema.pre('save', async function (next) {
  if (!this.isModified('user')) {
    return next();
  }
  const { user } = this;
  const getuser = await User.findById(user);
  if (!getuser) {
    throw new ApiError('No User found with this id', httpStatus.BAD_REQUEST);
  }
  next();
});
const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
