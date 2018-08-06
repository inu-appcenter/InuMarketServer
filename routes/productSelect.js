const express = require('express')
const router = express.Router()
const product = require('./model/product')
const authMiddleware = require('./function/auth')

router.use('/',authMiddleware)

router.post('/main',async(req,res)=> {
    await product.find({},
        {
            "_id":false,
            "productStar":false,
            "productInfo":false,
            "productState":false,
            "method":false,
            "place":false,
            "category":false,
            "sellerId":false,
        }).sort({updateDate:'desc'}).exec(function(err,docs){
        if(err){
            throw err
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/oneItem',async (req,res)=>{
    await product.findOne({"productId":req.body.productId}).exec(function(err,docs){
        if(err){
            throw err
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/search',async (req,res)=> {
    const Name = req.body.productName
    await product.find({"productName":{$regex:req.body.productName,$options:'i'}},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
        "category":false,
        "sellerId":false,
    }).exec(function(err,docs){
        if(err){
            throw(err)
        }
        else{
            res.send(docs)
        }
    })
})

module.exports = router