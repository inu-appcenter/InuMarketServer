const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bannerSchema = new Schema({
    fileName : [],

})

module.exports = mongoose.model('bannerform',bannerSchema)