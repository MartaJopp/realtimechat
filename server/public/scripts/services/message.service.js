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
//call a function to get messages here?
    })
// self.id = 3;
    //post new message to board
    // self.newMessage = function (message) {
    //     console.log('New Message', message);
    //     self.sendMessage.message = message;
    //     console.log('What is self.sendMessage', self.sendMessage)
    //     $http.post('/message', self.sendMessage).then(function (response) {
    //         console.log('Success');
    //     }).catch(function (err) {
    //         console.log('Error Posting Message');
    //     })
    // }; //end send Message function

    self.newMessage = function (message) {
        //saves the current equation
        //evaluates the equation
        //problem and solution made into an object
        self.sendMessage.message = message;
        console.log(self.sendMessage);
        console.log('here')
        $http.post('/message/', self.sendMessage).then(function (response) {
            console.log('Success');
        }).catch(function (err) {
            console.log('Error Posting Total');
        })
    } //end total function


    self.getMessages = function () {
        $http.get('/messages/').then(function (response) {
            self.messages.data = response.data;
        }).catch(function (err) {
            console.log('Error getting messages');
        })
    } // end getProblems function

}]);