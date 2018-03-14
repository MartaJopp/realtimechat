myApp.controller('MessageBoardController', ['$scope', 'UserService', 'MessageService', function ($scope, UserService, MessageService, socket) {
  console.log('MessageBoardController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.messages = MessageService.messages;
  vm.userObject = UserService.userObject
  vm.showPicture = false;
  vm.sendMessage = MessageService.sendMessage;

  //post new message from input
  vm.newMessage = function (message) {
    console.log('clicked')
    MessageService.newMessage(message).then(function (response) {
      vm.sendMessage.message = '';
      vm.sendMessage.messagePicture = '';
      vm.showPicture = false;
    }).catch(function (error) {
      console.log('An error occurred.')
    })
  }//end newMessage

  //get existing messages
  vm.getMessages = function () {
    MessageService.getMessages()
    console.log('from controller', vm.messages)
  } //end get messages

  //get messages upon logging in
  vm.getMessages()

  vm.fsClient = filestack.init('A1JwDWLRvRvgGNT0VV1LBz');
  //file picker for updating profile picture
  vm.messagePhoto = function () {
    console.log('in new photo picker')
    vm.fsClient.pick({
      fromSources: ["local_file_system"],
      accept: ["image/*"]
    }).then(function (response) {
      $scope.$apply(function () {
        vm.sendMessage.messagePicture = response.filesUploaded[0].url;
        vm.showPicture = true;
      });
    });
    vm.sendMessage.messagePicture = '';
  } //end choose photo for message

  //cancels and clears out the photo
  vm.cancelAddPhoto = function () {
    vm.sendMessage.messagePicture = '';
    vm.showPicture = false;
  }

//functions to vote counters - already added to message schema
//need to complete put route to server
  vm.voteHeart = function () {
    console.log('Heart Clicked')
  } //end voteHeart

  vm.voteThumbsUp = function () {
    console.log('Thumbs Up Clicked')
  } //end Thumbsup

  vm.voteThumbsDown = function () {
    console.log('Thumbs Down Clicked')
  } //end Thumbsdown

  vm.voteSmile = function () {
    console.log('Smile Clicked')
  } //end voteSmile

}]);
