const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    sender : String,
    context : String,
    date : String
})

module.exports = mongoose.model('reportform',reportSchema)