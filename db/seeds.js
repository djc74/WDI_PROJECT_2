const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Dragon = require('../models/dragon');

// Drop the model
User.collection.drop();
Dragon.collection.drop();

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
        image: 'https://i.imgur.com/aWvACrkb.jpg',
        name: 'Monstrous Nightmare',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        createdBy: users[0],
        comments: [{ content: 'this is scary', createdBy: users[0]}]
      }]);
  })
  .then((dragons) => console.log(`${dragons.length} dragons created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
