var Message = require('./message.js');

// use mongoose to get all messages in the database
exports.getMessages = function (callback) {
    Message.find().exec(callback);
}

exports.createMessage = function (message, callback) {
    Message.create({
        text: message
    }, callback);
}

exports.removeMessage = function (message_id, callback) {
    Message.remove({
        _id: message_id
    }, callback);
}