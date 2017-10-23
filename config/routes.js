const express = require('express');
const router  = express.Router();
const statics = require('../controllers/statics');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const dragonsController = require('../controllers/dragons');
const secureRoute = require('../lib/secureRoute');



router.route('/')
  .get(statics.home);

router.route('/dragons')
  .get(dragonsController.index)
  .post(secureRoute, dragonsController.create);

router.route('/dragons/new')
  .get(secureRoute, dragonsController.new);

router.route('/dragons/:id')
  .get(dragonsController.show)
  .put(secureRoute, dragonsController.update)
  .delete(secureRoute, dragonsController.delete);

router.route('/dragons/:id/edit')
  .get(secureRoute, dragonsController.edit);

router.route('/dragons/:id/comments')
  .post(secureRoute, dragonsController.createComment)
  .delete(secureRoute, dragonsController.deleteComment);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/profile')
  .get(secureRoute, registrationsController.show)
  .put(secureRoute, registrationsController.update)
  .delete(secureRoute, registrationsController.delete);

router.route('/profile/edit')
  .get(secureRoute, registrationsController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
