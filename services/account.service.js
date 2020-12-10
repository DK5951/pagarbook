const httpStatus = require('http-status');
const { Account } = require('../models');
const ApiError = require('../utils/ApiError');

const getAccountbyId = async (id) => {
  const account = await Account.findById(id);
  return account;
};
// eslint-disable-next-line
const verifyAccount = (account_No, confirm_account_No) => {
  // eslint-disable-next-line
  return account_No === confirm_account_No;
};

const createAccount = async (body) => {
  const istrue = await verifyAccount(body.accountNumber, body.confirmaccountNumber);
  if (istrue) {
    // eslint-disable-next-line
    delete body.confirmaccountNumber;
    const account = await Account.create(body);
    return account;
  }
  throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
};

const deleteAccount = async (id) => {
  const account = await Account.findByIdAndRemove(id);
  return account;
};
const editAccount = async (id, body) => {
  let account = await getAccountbyId(id);
  if (!account) {
    throw new ApiError('Same thing is wrong', httpStatus.BAD_REQUEST);
  }
  Object.assign(account, body);
  account = await account.save();
  return account;
};

module.exports = {
  createAccount,
  deleteAccount,
  editAccount,
  getAccountbyId,
};
