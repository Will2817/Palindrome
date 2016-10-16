var Message = require('./message.js');

// Fetch a message by id
exports.getMessage = function(message_id,callback){
    Message.findById(message_id,callback)
}

// Fetch all messages
exports.getMessages = function (callback) {
    Message.find().exec(callback);
}

//Create a message
exports.createMessage = function (message, callback) {
    Message.create({
        text: message,
        isPalindrome: exports.isPalindrome(message)
    }, callback);
}

//Update a message text by id
exports.updateMessage = function(message_id,text,callback){
    Message.findById(message_id,function (err, message){
        if (err) {
            callback()
        }
        else{
            message.text = text
            message.isPalindrome = exports.isPalindrome(text)
            message.save(callback);
        }
    });
}

//Remore a message
exports.removeMessage = function (message_id, callback) {
    Message.remove({
        _id: message_id
    }, callback);
}

//Check if a message is a palindrome
exports.isPalindrome = function (message) {
    //Remove all special characters and lowercase remaining letters
    var message = message.replace(/[^a-zA-Z]/g, "").toLowerCase();
    //Compare characters from the outside in
    for (i = 0; i < message.length/2; i++){
        if (message.charAt(i) != message.charAt(message.length-1-i)) {
            return false;
        }
    }
    return true;
}