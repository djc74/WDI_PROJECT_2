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
        description: 'The only way to describe the monster was a bipedal complete absence of light. It wasn\'t just blackness, it was nothing at all. He cast no shadow, made no noise and gave off no odour. But if he targeted you he would seize you by the neck and jump into the air so that he could not be followed. The rest of what we know is guess work from the remains of his victims. He seems to eat them like a delicacy. The bones appear to be gnawed with small razor sharp teeth and they are left lined up in order of size, very neatly.',
        createdBy: users[0],
        comments: [{ content: 'this is scary', createdBy: users[0]}]
      }]);
  })
  .then((dragons) => console.log(`${dragons.length} dragons created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
