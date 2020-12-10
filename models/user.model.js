const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { toJSON } = require('./plugins');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      default: '',
      trim: true,
    },
    mobileNumber: {
      type: Number,
      // min:8,
      // max:15,
      validate: /^\d{10}$/,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      private: true,
    },
    image: {
      type: String,
      default: 'avatar.jpg',
    },
    otp: {
      type: Number,
      private: true,
    },
    resetOtpExpire: {
      type: Date,
      private: true,
    },
  },
  { timeStamp: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);

/**
 * Hashing the password before saving
 * */
userSchema.plugin(toJSON);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 8);
  return next();
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcryptjs.compare(password, user.password);
};

// /**
//  * Check if password matches the user's password
//  * @param {number} otp
//  * @returns {Promise<boolean>}
//  */
// userSchema.methods.isOtpMatch = async function (otp) {
//   const user = this;
//   return user.otp === otp;
//  };
// userSchema.methods.isMobileMatchNumber = async function (mobileNumber) {
//   const user = this;
//   return  user.mobileNumber  === mobileNumber;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
