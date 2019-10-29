const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatRoomSchema = new Schema({
    chatRoomId : String,
    seller : String,
    buyer : String
})

module.exports = mongoose.model('chatRoomform',chatRoomSchema)