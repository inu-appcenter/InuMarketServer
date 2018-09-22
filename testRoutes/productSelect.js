const express = require('express')
const router = express.Router()
const product = require('./model/product')
const authMiddleware = require('./function/auth')

//router.use('/',authMiddleware)

router.post('/main',async(req,res)=> {
    await product.find({"productSelled":false},
        {
            "_id":false,
            "productStar":false,
            "productInfo":false,
            "productState":false,
            "method":false,
            "place":false,
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
    await product.findOne({"productId":req.body.productId,"productSelled":false}).exec(function(err,docs){
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
    await product.find({"productName":{$regex:req.body.productName,$options:'i'},"productSelled":false},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
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

router.post('/selled',async (req,res)=>{
    const seller = req.body.sellerId
    await product.find({"sellerId":seller,"productSelled":true},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).sort({updateDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw(err)
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/nonsell',async (req,res)=>{
    const seller = req.body.sellerId
    await product.find({"sellerId":seller,"productSelled":false},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).sort({updateDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw(err)
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/searchId',async (req,res)=>{
    const seller = req.body.sellerId
    await product.find({"sellerId":seller},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).sort({updateDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw(err)
        }
        else{
            res.send(docs)
        }
    }) 
})

router.post('/category',async (req,res)=>{
    await product.find({"category":{$regex:req.body.category,$options:'i'},"productSelled":false},{
        "_id":false,
        "productStar":false,
        "productInfo":false,
        "productState":false,
        "method":false,
        "place":false,
    }).sort({updateDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw(err)
            res.send({ans:"err"})
        }
        else{
            res.send(docs)
        }
    })
})


module.exports = router