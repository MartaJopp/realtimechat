myApp.controller('UserController', ['UserService', function(UserService) {
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
}]);
