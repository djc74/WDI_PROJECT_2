const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');

// Drop the model
User.collection.drop();

// create models
User
  .create([{
    firstName: 'David',
    lastName: 'Cooper',
    username: 'david',
    email: 'david@david.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then(users => console.log(`${users.length} users were created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
