const express = require('express');

const router = express();
const { authvalidation } = require('../validation');
const { authController } = require('../controllers');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

router.post('/signup', validate(authvalidation.signup), authController.Signup);
router.post('/login', validate(authvalidation.login), authController.Login);
router.post('/resend-otp', validate(authvalidation.signup), authController.Resend);
router.post('/verify-otp', validate(authvalidation.VerifyOtp), authController.verifyUserByOtp);
router.post('/set-password', validate(authvalidation.setPassword), authController.setPassword);
router.delete('/delete-password', auth, validate(authvalidation.VerifyOtp), authController.deletePassword);

module.exports = router;
