var mongoose = require('mongoose');

// Message model
module.exports = mongoose.model('Message', {
    text: String,
    isPalindrome: Boolean
});