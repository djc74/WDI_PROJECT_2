const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Dragon = require('../models/dragons');
// Drop the model
User.collection.drop();

// create models
User
  .create([{
    firstName: 'David',
    lastName: 'Cooper',
    email: 'david@david.com',
    username: 'david',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users were created!`);
    return Dragon
      .create([{
        name: 'Monstrous Nightmare',
        colour: 'black',
        size: 'small',
        createdBy: users[0],
        comment: 'Very scary'
      }]);
  })
  .then((dragons) => console.log(`${dragons.length} dragons created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
