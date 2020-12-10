const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { Business } = require('.');
const { toJSON } = require('./plugins');
const ApiError = require('../utils/ApiError');

const { Schema } = mongoose;

const hirePostSchema = new Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Activate', 'Deactivate'],
      default: 'Activate',
      required: true,
    },
  },
  { timeStamp: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);
hirePostSchema.plugin(toJSON);

hirePostSchema.pre('save', async function (next) {
  const { business } = this;
  const getbusiness = await Business.findById(business);
  if (!getbusiness) {
    throw new ApiError('No business found with this id', httpStatus.BAD_REQUEST);
  }
  next();
});

const HirePost = mongoose.model('HirePost', hirePostSchema);

module.exports = HirePost;
