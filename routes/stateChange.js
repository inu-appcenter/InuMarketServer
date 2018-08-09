const express = require('express')
const router = express.Router()
const randomstring = require('randomstring')
const product = require('./model/product')
const account = require('./model/account')
const mailing = require('./config/sendEmail')
const config = require('./config/config')
const crypto = require('crypto')


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

router.post('/password',async (req,res)=>{
    const newPasswd = randomstring.generate()
    const encrypted = crypto.createHmac('sha1', config.secret)
                                .update(newPasswd)
                                .digest('base64')
    await account.update({"id":req.body.id,"name":req.body.name},{$set:{passwd:encrypted}}).exec(async (err,docs)=>{
        if(err){
            throw err
            res.json({ans:"fail"})
        }
        else{
            await mailing(docs.id+"@inu.ac.kr",newPasswd,"passwd")
            res.json({ans:"success"})
        }
    })
})


module.exports = router