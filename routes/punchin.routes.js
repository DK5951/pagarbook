const express = require('express');

const router = express();
const validate = require('../middlewares/validate');

const { punchinValidation } = require('../validation');
const auth = require('../middlewares/auth');
const punchinControler = require('../controllers/punchin.controler');

router
  .route('/:staffId')
  .post(auth, validate(punchinValidation.punchin), punchinControler.editPunchinById)
  .put(auth, validate(punchinValidation.punchout), punchinControler.editPunchinById);
module.exports = router;
