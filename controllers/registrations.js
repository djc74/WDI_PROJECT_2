const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registration/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => res.render('error', {err}));
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
