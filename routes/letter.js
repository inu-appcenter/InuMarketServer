const express = require('express')
const router = express.Router()
const letter = require('./model/letter')

router.post('/send',async (req,res)=>{
    const sellerLetter = new letter() //판매자에게 가는 쪽지
    const customerLetter = new letter() //구매자에게 가는 쪽지

    sellerLetter.sendId = req.body.custId
    sellerLetter.reciveId = req.body.sellerId
    sellerLetter.sellBuy = true //판매중인상품
    sellerLetter.letterRead = false
    sellerLetter.productId = req.body.productId
    sellerLetter.productName = req.body.productName
    
    customerLetter.sendId = req.body.sellerId
    customerLetter.reciveId = req.body.custId
    customerLetter.sellBuy = false//구매중인상품
    customerLetter.letterRead = false
    customerLetter.productId = req.body.productId
    customerLetter.productName = req.body.productName

    await sellerLetter.save(async (err)=>{
        if(err){
            console.log(err);
            throw err
        }
        else{
            console.log("to"+req.body.sellerId+"from"+req.body.custId)
        }


    })
    await customerLetter.save(async(err)=>{
        if(err){
            console.log(err)
            throw err
        }
        else{
            console.log("to"+req.body.custId+"from"+req.body.sellerId)
        }
    })
    res.json({ans:true})

})

module.exports = router