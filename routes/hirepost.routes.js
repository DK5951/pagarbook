const express = require('express');

const router = express();

const validate = require('../middlewares/validate');
const { hirePostvalidation } = require('../validation');
const { hirePostController } = require('../controllers');
const auth = require('../middlewares/auth');
const hirepostController = require('../controllers/hirepost.controller');

router
  .route('/')
  .post(auth, validate(hirePostvalidation.createHirePost), hirePostController.createHirePost)
  .get(auth, hirePostController.getHireposts);

router
  .route('/:postId')
  .get(auth, validate(hirePostvalidation.HirePostid), hirePostController.getHirePostsbyId)
  .patch(auth, validate(hirePostvalidation.editHirePost), hirePostController.editHirePostsbyId)
  .delete(auth, validate(hirePostvalidation.HirePostid), hirePostController.deleteHirePostsbyId)
  .post(auth, validate(hirePostvalidation.HirePostStatus), hirepostController.hirePostStatus);
module.exports = router;
