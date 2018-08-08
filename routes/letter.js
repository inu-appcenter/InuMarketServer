const express = require('express')
const router = express.Router()
const letter = require('./model/letter')
const account = require('./model/account')

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

    await account.find({"id":req.body.custId}).exec(
        async (err,docs)=>{
            if(err) throw err
            else{
                sellerLetter.senderPhone = docs[0].tel
                await sellerLetter.save(async (err,docs)=>{
                    if(err){
                        console.log(err);
                        throw err
                    }
                    else{
                        await account.update({"id":docs.sendId},
                        {$push:{letterNum:docs.letterId}},
                        {upsert:true})
                        console.log("to"+req.body.sellerId+"from"+req.body.custId)
                    }
            
            
                })
            }
        }
    )
    
    await account.find({"id":req.body.sellerId}).exec(
        async (err,docs)=>{
            if(err) throw err
            else{
                customerLetter.senderPhone = docs[0].tel
                await customerLetter.save(async(err,docs)=>{
                    if(err){
                        console.log(err)
                        throw err
                    }
                    else{
                        await account.update({"id":docs.sendId},
                        {$push:{letterNum:docs.letterId}},
                        {upsert:true})
                        console.log("to"+req.body.custId+"from"+req.body.sellerId)
                    }
                })
            }
        }
    )
    
    res.json({ans:true})

})

module.exports = router