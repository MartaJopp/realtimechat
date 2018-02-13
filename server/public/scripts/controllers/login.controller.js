myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('LoginController created');
    var vm = this;
    vm.user = {
      username: '',
      password: ''
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
}]);
