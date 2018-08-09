const express = require('express')
const router = express.Router()
const product = require('./model/product')


router.post('/product',async (req,res) => {
    await product.update(
        {"productId":req.body.productId},
        {$set:{productSelled:true}}
    ).exec((err)=>{
        if(err){
            throw err
            res.json({ans:"fail"})
        }
        else{
            res.json({ans:"success"})
        }
    })
})


module.exports = router