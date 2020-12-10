const express = require('express');

const validate = require('../middlewares/validate');
const { accountValidation } = require('../validation');
const { accountController } = require('../controllers');
const auth = require('../middlewares/auth');
const accountValidate = require('../validation/account.validate');

const router = express();
router.route('/').post(auth, validate(accountValidation.createAccount), accountController.setAccount);
router
  .route('/:accountId')
  .get(auth, validate(accountValidate.getAccountById), accountController.getAccountbyId)
  .patch(auth, validate(accountValidation.editAccount), accountController.editAccount)
  .delete(auth, validate(accountValidation.getAccountById), accountController.deleteAccount);
module.exports = router;
