myApp.controller('MessageBoardController', ['UserService', 'MessageService', function (UserService, MessageService, socket) {
  console.log('MessageBoardController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.messages = MessageService.messages;
  vm.userObject = UserService.userObject

  //post new message from input
  vm.newMessage = function (message) {
    console.log('clicked')
    MessageService.newMessage(message).then(function (response) {
      vm.message = '';
    }).catch(function (error) {
      console.log('An error occurred.')
    })
  }//end newMessage

  //get existing messages
  vm.getMessages = function () {
    MessageService.getMessages()
    console.log('from controller', vm.messages)
  } //end get messages

  vm.getMessages()



}]);
