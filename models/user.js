// btht-api/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    firstname: String,
    lastname: String
});

module.exports = mongoose.model('User', UserSchema);
