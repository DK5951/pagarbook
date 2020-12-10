const express = require('express');

const router = express();
const validate = require('../middlewares/validate');
const { businessvalidation } = require('../validation');
const { businessController } = require('../controllers');
const auth = require('../middlewares/auth');

router
  .route('/')
  .post(auth, validate(businessvalidation.createBusiness), businessController.createBusiness)
  .get(auth, businessController.getBusiness);
router
  .route('/:businessId')
  .patch(auth, validate(businessvalidation.editBusiness), businessController.editBusiness)
  .delete(auth, validate(businessvalidation.deleteBusiness), businessController.deleteBusiness)
  .get(auth, validate(businessvalidation.deleteBusiness), businessController.getBusinessbyid)
  .post(auth, validate(businessvalidation.addBusiness), businessController.addBusiness);
module.exports = router;
