const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountChatSchema = new Schema({
    user : String,
    fcm : String,
    socketId : String,
    chatList : [[String]]
})

module.exports = mongoose.model('accountChatform',accountChatSchema)