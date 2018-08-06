const express = require('express')
const router = express.Router()
var product = require('./model/product')
const send = require('./function/sendEmail')


router.post('/',async (req,res)=>{
    /*console.log(req.body)
    const nowDate = new Date();

    var newProduct = new product();
    newProduct.productName = req.body.productName;
    newProduct.productState = req.body.productState;
    newProduct.productPrice = req.body.productPrice;
    newProduct.category = req.body.category;
    newProduct.productInfo = req.body.productInfo;
    newProduct.method = req.body.method;
    newProduct.place = req.body.place;
    newProduct.sellerId = req.body.id;
    newProduct.updateDate = nowDate;
    await newProduct.save(function(err) {
        if(err){
            console.error(err);
            res.send(false)
            return;
        }
        console.log("입력완료")
        return;
    })
    res.send(true);*/

    send("limson222@gmail.com","fjfj")
    res.send(true)
})

module.exports = router