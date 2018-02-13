myApp.controller('MessageBoardController', ['UserService', 'MessageService', function(UserService, MessageService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;


  vm.newMessage = function (message) {
    console.log ('clicked')
    console.log ('message', message)
  }

}]);
