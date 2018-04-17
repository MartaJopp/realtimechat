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

    self.addSmile = {
    }

   self.getSpecificMessage = {
       id: ''
   }

    //receives messages realtime
    var socket = io()
    socket.on('message', function (data) {
        console.log('message received', data)
        self.getMessages()
    })

    socket.on('smileVotes', function (data){
        console.log('vote received', data)
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

    // add +1 to smile 
    self.voteSmile = function (id, smileNumber) {
        console.log(smileNumber)
        console.log('vote smile in message service')
        console.log('addSmile', self.addSmile);
        console.log(id);
        $http.put('/message/' + id, self.addSmile ).then(function (response){
            console.log(response)
        }).catch(function (err){
            console.log('Error voting for smile');
        })

    } // end voteSmile 


}]);