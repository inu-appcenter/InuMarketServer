const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    sender : String,
    context : String,
    date : Date
})

module.exports = mongoose.model('rtform',reportSchema)