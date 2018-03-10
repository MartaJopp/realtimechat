myApp.service('UserService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog, socket) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.editedUserProfile = {};

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/api/user').then(function (response) {
      if (response.data.username) {
        // user has a current session on the server
        self.userObject.userName = response.data.username;
        console.log('the response', response.data)
        self.userObject.city = response.data.city;
        self.userObject.birthday = response.data.birthday;
        self.userObject.profilePicture = response.data.profilePicture;
        self.userObject.occupation = response.data.occupation;
        self.userObject._id = response.data._id
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/api/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }

  //save profile function
  self.saveProfile = function (id, editedProfile) {
    console.log(editedProfile, id)
    self.editedUserProfile = editedProfile;
    console.log(self.editedUserProfile.userName)
    console.log('updated user', self.editedUserProfile)
    return $http.put('/api/user/' + id, self.editedUserProfile).then(function (response) {
      return response
    })
  }//end save profile

  //get all users
  self.getAllUsers = function () {
    return $http.get('/api/user/allusers').then(function (response) {
      // console.log('All Users', response.data)
      return response
    })
  }//end get all users

  self.pictureUrl = ''
  self.showUserPicture = function (event, picture) {
    self.pictureUrl = picture
    console.log(self.pictureUrl)
    $mdDialog.show({
      controller: 'ImageController as img',
      templateUrl: '/views/templates/image.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    })
  }

}]);
