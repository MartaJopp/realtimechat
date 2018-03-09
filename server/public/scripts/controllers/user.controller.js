myApp.controller('UserController', ['UserService', function (UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.editProfile = true;
  // vm.editedProfile = {}

  vm.updateProfile = function () {
    vm.editProfile = false;
    console.log(vm.editProfile)
  }

  vm.cancelEdit = function () {
    vm.editProfile = true;
  }


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


  } //end addRental function


}]);
