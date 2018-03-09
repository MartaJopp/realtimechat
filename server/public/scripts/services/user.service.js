myApp.service('UserService', ['$http', '$location', function($http, $location, socket){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.editedUserProfile = {};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
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
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  //save profile function
  self.saveProfile = function(id, editedProfile) {
    console.log(editedProfile, id)
    self.editedUserProfile = editedProfile;
    console.log('updated user', self.editedUserProfile)
    return $http.put('/api/user/' + id, self.editedUserProfile).then(function (response){
      console.log(response)
      return response
      //refresh the user profile based on the changes
      self.getUser();
    })
  }//end save profile
}]);
