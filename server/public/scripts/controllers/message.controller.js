myApp.controller('MessageBoardController', ['$scope', 'UserService', 'MessageService', function ($scope, UserService, MessageService, socket) {
  console.log('MessageBoardController created');
  var vm = this;
  vm.userService = UserService;
  vm.messageService = MessageService;
  vm.messages = MessageService.messages;
  vm.userObject = UserService.userObject
  vm.showPicture = false;
  vm.sendMessage = MessageService.sendMessage;
  vm.heartFilled = false;
  vm.smileFilled = false;
  vm.thumbsUpFilled = false;
  vm.thumbsDownFilled = false;
  vm.popoverIsVisible = false;


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

  vm.voteSmile = function (id) {
    console.log('Smile Clicked')
    vm.smileFilled = true;
    var smile = 'smile';
    MessageService.voteAdded(id, smile)
  } //end voteSmile

  vm.voteHeart = function (id) {
    console.log('Heart Clicked')
    var heart = 'heart';
    MessageService.voteAdded(id, heart)
  }

  vm.voteThumbsUp = function (id){
    var thumbsUp = 'thumbsUp';
    MessageService.voteAdded(id, thumbsUp)
  }

  vm.voteThumbsDown = function (id) {
    var thumbsDown = 'thumbsDown';
    MessageService.voteAdded(id, thumbsDown)
  }

  vm.showNames = function () {
    vm.popoverIsVisible = true;
  };

  vm.hideNames = function () {
    vm.popoverIsVisible = false;
  };

}]);
