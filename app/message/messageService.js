var Message = require('./message.js');

// use mongoose to get all messages in the database
exports.getMessage = function(message_id,callback){
    Message.findById(message_id,callback)
}

exports.getMessages = function (callback) {
    Message.find().exec(callback);
}

exports.createMessage = function (message, callback) {
    Message.create({
        text: message,
        isPalindrome: exports.isPalindrome(message)
    }, callback);
}

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

exports.removeMessage = function (message_id, callback) {
    Message.remove({
        _id: message_id
    }, callback);
}

exports.isPalindrome = function (message) {
    var message = message.replace(/[^a-zA-Z]/g, "");
    for (i = 0; i < message.length/2; i++){
        if (message.charAt(i) != message.charAt(message.length-1-i)) {
            return false;
        }
    }
    return true;
}