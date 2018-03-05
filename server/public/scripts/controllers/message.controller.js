myApp.controller('MessageBoardController', ['UserService', 'MessageService', function(UserService, MessageService, socket) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.messages = MessageService.messages;
//post new message from input
  vm.newMessage = function (message) {
    console.log('clicked')
    MessageService.newMessage(message)

   
  }//end newMessage

  //get existing messages
  vm.getMessages = function (){
    MessageService.getMessages()
    console.log('from controller', vm.messages)
  } //end get messages

  vm.getMessages()
}]);
