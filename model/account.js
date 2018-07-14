var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    name : String,
    id : Number,
    tel : Number,
    passwd : String,
    letterNum : {
    },
    myProductNum : {
    },
    certification : Boolean,
    userState : Number,
    session : String,
    autoLogin : Boolean,
    FCM : String
});

module.exports = mongoose.model('form',accountSchema);