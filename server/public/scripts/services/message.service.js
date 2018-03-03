myApp.service('MessageService', ['$http', '$location', function ($http, $location, socket) {
    console.log('UserService Loaded');
    var self = this;

    self.sendMessage = {
        message: '',
    }

    self.messages = {
        data: []
    }

    var socket = io()
    socket.on('message', function (data) {
//call a function to get messages here?
    })
// self.id = 3;
    //post new message to board
    self.newMessage = function (message) {
        self.sendMessage.message = message;
        console.log(self.sendMessage)
        $http.post('/messages', self.sendMessage).then(function (response) {
            console.log('Success');
        }).catch(function (err) {
            console.log('Error Posting Total');
        })
    }; //end send Message function

    self.getMessages = function () {
        $http.get('/messages/').then(function (response) {
            self.messages.data = response.data;
        }).catch(function (err) {
            console.log('Error getting messages');
        })
    } // end getProblems function

}]);