const express = require('express');

const router = express();
const validate = require('../middlewares/validate');

const { staffValidation } = require('../validation');
const auth = require('../middlewares/auth');
const { staffController } = require('../controllers');

router.use('/allowa-bonus', require('./allowBounus.routes'));
router.use('/punchin', require('./punchin.routes'));

router.route('/').post(auth, validate(staffValidation.createStaff), staffController.createStaff);
router.route('/all/:businessId').get(auth, validate(staffValidation.getallStaff), staffController.getallStaff);
router.get('/all-staff-salary-status', auth, staffController.allStaffSalaryStatus);
router
  .route('/:staffId')
  .get(auth, validate(staffValidation.StaffbyId), staffController.getStaffbyid)
  .patch(auth, validate(staffValidation.editStaffbyId), staffController.editStaffbyId)
  .post(auth, validate(staffValidation.StaffStatus), staffController.staffStatus)
  .delete(auth, validate(staffValidation.StaffbyId), staffController.deleteStaffbyId);

router
  .route('/staff-caculation/:staffId')
  .post(auth, validate(staffValidation.StaffbyId), staffController.getTotalSalaryCalculationOfparticularStaff)
  .get(auth, validate(staffValidation.StaffbyId), staffController.getSalaryCalculationOfparticularStaff);
module.exports = router;
