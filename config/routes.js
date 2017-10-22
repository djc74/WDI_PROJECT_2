const express = require('express');
const router  = express.Router();
const statics = require('../controllers/statics');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');



router.route('/')
  .get(statics.home);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);


module.exports = router;
