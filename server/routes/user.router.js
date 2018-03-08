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
  const newPerson = new Person({ username, password, city, birthday, occupation, profilePicture  });
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

router.put('/:id', function(req, res){
  let user = req.params.id;
  Person.update({ "_id": user }, {
    $set: {
      "username": req.body.username,
        "occupation": req.body.occupation,
        "city": req.body.city,
        "birthday": req.body.birthday,
        "profilePicture": req.body.profilePicture
      }
  }, function (err, personFound) {
    if (err) {
      console.log("Error received updating person.", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204)
    };
  })
})//end update route


module.exports = router;
