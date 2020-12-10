const express = require('express');

const router = express();
const validate = require('../middlewares/validate');
const { uservalidation } = require('../validation');
const auth = require('../middlewares/auth');
const { userController } = require('../controllers');

router
  .route('/me')
  .get(auth, userController.getuserbyId)
  .patch(auth, validate(uservalidation.editUser), userController.edituserbyId);

module.exports = router;
