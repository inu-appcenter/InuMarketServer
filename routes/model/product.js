var mongoose = require('mongoose')
var shortid = require('shortid')
var Schema = mongoose.Schema

var productSchema = new Schema({
    productName : String,
    productPrice : Number,
    productStar : Number,
    productInfo : String,
    productState : String,
    method : String,
    place : String,
    category : String,
    sellerId : String,
    productId : {
        type : String,
        unique : true,        
        default: shortid.generate
},
    productImg : [],
    updateDate : Date
});


module.exports = mongoose.model('Pform',productSchema)