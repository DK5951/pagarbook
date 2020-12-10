const express = require('express');

const router = express();
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { alloBounusController } = require('../controllers');
const { AllowbonusValidation } = require('../validation');
const allowbonusValidation = require('../validation/allowbonus.validation');

router.post('/allowance', auth, validate(AllowbonusValidation.createAllowance), alloBounusController.createalloBouns);
router
  .route('/allowance/:allowanceId')
  .get(auth, validate(allowbonusValidation.getAllowance), alloBounusController.getAllowance)
  .put(auth, validate(allowbonusValidation.editAllowance, alloBounusController.editBonus));

router.post('/bonus', auth, validate(AllowbonusValidation.createBonus), alloBounusController.createalloBouns);
router
  .route('/bonus/:bonusId')
  .get(auth, validate(allowbonusValidation.getBonus), alloBounusController.getBonus)
  .put(auth, validate(allowbonusValidation.editBonus), alloBounusController.editBonus);
module.exports = router;
