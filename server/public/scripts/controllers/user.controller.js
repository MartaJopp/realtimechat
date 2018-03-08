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

  vm.saveProfile = function (id, editedProfile) {
    console.log(vm.editedProfile)
    UserService.saveProfile(id, editedProfile).then(function (response){
    vm.editProfile = true;
    // })
    swal({
      "title": "Updated!",
      "text": "Your profile has been updated!",
      "icon": "success"
    });
    }).catch(function () {
      swal('Something went wrong.');
  }
    )} //end saveProfile


}]);
