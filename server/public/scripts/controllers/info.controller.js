myApp.controller('MessageBoardController', ['UserService', function(UserService) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;
}]);
