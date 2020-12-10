const express = require('express');

const router = express.Router();
const authRoutes = require('./auth.routes');
const businessRoutes = require('./business.routes');
const hirePostRoutes = require('./hirepost.routes');
const userRoutes = require('./user.routes');
const staffRoutes = require('./staff.routes');
const accountRoutes = require('./account.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/business', businessRoutes);
router.use('/hire-post', hirePostRoutes);
router.use('/staff-info', staffRoutes);
router.use('/account', accountRoutes);

module.exports = router;
