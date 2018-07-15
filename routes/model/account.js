var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto')
const config = require('../config/config')

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

//find one user by using accountid
accountSchema.statics.findOnByAccountId = function(id) {
    return this.findOne({
        id
    }).exec()
}

//passwd
accountSchema.methods.verify = function(passwd){
    const encrypted = crypto.createHmac('sha1',config.secret)
                            .update(passwd)
                            .digest('base64')
    return this.passwd === encrypted
}

module.exports = mongoose.model('form',accountSchema);