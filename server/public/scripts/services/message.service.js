myApp.service('MessageService', ['$http', '$location', function ($http, $location, socket) {
    console.log('UserService Loaded');
    var self = this;

    self.sendMessage = {
        message: '',
        messagePicture: ''
    }

    self.messages = {
        data: []
    }

    //receives messages realtime
    var socket = io()
    socket.on('message', function (data) {
        console.log('message received', data)
        self.getMessages()
    })

    //post new message to board
    self.newMessage = function (message) {
        self.sendMessage.message = message.message;
        self.sendMessage.messagePicture = message.messagePicture;
        console.log(self.sendMessage);
        return $http.post('/message/', self.sendMessage).then(function (response) {
            console.log('Success');
        }).catch(function (err) {
            console.log('Error Posting Total');
        })
    } //end new message


    //get all messages upon logging in
    self.getMessages = function () {
        console.log('This got called')
        $http.get('/message/').then(function (response) {
            console.log(response.data)
            self.messages.data = response.data;
        }).catch(function (err) {
            console.log('Error getting messages');
        })
    } // end getMessages function

    //add photo with message
    // self.messagePhoto = function () {
    //     console.log('add photo clicked')
    // }


}]);