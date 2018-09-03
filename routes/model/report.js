const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    sender : String,
    context : String,
    date : Date.now
})

module.exports = mongoose.model('rform',reportSchema)