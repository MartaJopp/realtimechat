myApp.controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.editProfile = true;
  vm.editedProfile = {}

  vm.updateProfile = function () {
    vm.editProfile = false;
    console.log(vm.editProfile)
  }

  vm.cancelEdit = function () {
    vm.editProfile = true;
  }

  vm.fsClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');
  //file picker for updating profile picture
  vm.newPhoto = function () {
    console.log('in new photo picker')
    vm.fsClient.pick({
      fromSources: ["local_file_system"],
      accept: ["image/*"]
    }).then(function (response) {
      $scope.$apply(function () {
        vm.editedProfile.profilePicture = response.filesUploaded[0].url;
      });
    });
  } //end choose photo when registering

  //update Profile function
  vm.saveProfile = function (id, editedProfile) {
    console.log(vm.editedProfile)
    UserService.saveProfile(id, editedProfile).then(function (response) {
      vm.editProfile = true;
      console.log('response', response);
      UserService.getuser()
      swal({
        "title": "Updated!",
        "text": "Your profile has been updated!",
        "icon": "success"
      });
    }).catch(function () {
      swal('Something went wrong.');
    });
  } //end update Profile function


}]);
