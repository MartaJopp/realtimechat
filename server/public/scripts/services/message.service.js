myApp.service('MessageService', ['$http', '$location', function ($http, $location, socket) {
    console.log('UserService Loaded');
    var self = this;
    
    self.sendMessage = {
        message: ''
    }

    self.messages = {
        data: []
    }

    var socket = io()
    socket.on('message', function (data) {
        console.log('message received', data)
        self.getMessages()
    })


    //post new message to board
    self.newMessage = function (message) {
        self.sendMessage.message = message;
        console.log(self.sendMessage);
        console.log('here')
        return $http.post('/message/', self.sendMessage).then(function (response) {
            console.log('Success');
        }).catch(function (err) {
            console.log('Error Posting Total');
        })
    } //end total function


    self.getMessages = function () {
        console.log('This got called')
        $http.get('/message/').then(function (response) {
            console.log(response.data)
            self.messages.data = response.data;
        }).catch(function (err) {
            console.log('Error getting messages');
        })
    } // end getProblems function

}]);