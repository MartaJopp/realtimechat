const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    console.log('the user', req.user)
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const city = req.body.city
  const birthday = req.body.birthday
  const occupation = req.body.occupation
  const profilePicture = req.body.profilePicture
  const newPerson = new Person({ username, password, city, birthday, occupation, profilePicture });
  newPerson.save()
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/:id', function (req, res) {
  if (req.isAuthenticated) {

    let personToUpdate = req.body;
    let idToUpdate = req.params._id;

    //if update is left blank --> keeps original value
    if (req.body.userName === undefined) {
      req.body.userName = req.user.username
    }
    if (req.body.profilePicture === undefined) {
      req.body.profilePicture = req.user.profilePicture
    }
    if (req.body.occupation === undefined) {
      req.body.occupation = req.user.occupation
    }
    if (req.body.birthday === undefined) {
      req.body.birthday = req.user.birthday
    }
    if (req.body.city === undefined) {
      req.body.city = req.user.city
    }

    Person.update({ "_id": req.user.id }, {
      $set: {
        "username": req.body.userName,
        "occupation": req.body.occupation,
        "city": req.body.city,
        "birthday": req.body.birthday,
        "profilePicture": req.body.profilePicture
      }
    }, function (err, personToUpdate) {
      if (err) {
        console.log("Error received updating person.", err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204)
        console.log('success')
      };
    }) //end update
  } //end if authenticated
  else {
    console.log('User is not authenticated')
  }
})//end update route

//get all registered users
router.get('/allusers', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    Person.find({}).sort({ username: 1 }).exec(function (err, allUsers) { //finding all rentals in collection
      if (err) {
        console.log("ERROR!", err);
        res.sendStatus(500);
      } else {
        res.send(allUsers);
      }
    }); // END FIND
  } else {
    console.log('Users is not authenticated')
  }
}); //end get list of all users

module.exports = router;
