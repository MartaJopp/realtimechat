myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, UserService) {
  console.log('LoginController created');

  var vm = this;

  vm.user = {
    username: '',
    password: '',
    birthday: '',
    profilePicture: ''
  };

  vm.message = '';

  vm.login = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/api/user/login', vm.user).then(
        function (response) {
          if (response.status == 200) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user');
          } else {
            console.log('failure error: ', response);
            vm.message = "Incorrect credentials. Please try again.";
          }
        },
        function (response) {
          console.log('failure error: ', response);
          vm.message = "Incorrect credentials. Please try again.";
        });
    }
  };

  vm.registerUser = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/api/user/register', vm.user).then(function (response) {
        console.log('success');
        $location.path('/home');
      },
        function (response) {
          console.log('error');
          vm.message = "Something went wrong. Please try again."
        });
    }
  }

  vm.fsClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');
  //file picker for reply message
  vm.choosePhoto = function () {
    console.log('in reply picker')
    vm.fsClient.pick({
      fromSources: ["local_file_system"],
      accept: ["image/*", "video/*"]
    }).then(function (response) {
      $scope.$apply(function () {
        vm.user.profilePicture = response.filesUploaded[0].url;
      });
    });
  } //end choose photo when registering

}]);
