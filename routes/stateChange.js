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

router.post('/newPassword',async (req,res)=>{
    const newPasswd = randomstring.generate(7)
    const encrypted = crypto.createHmac('sha1', config.secret)
                                .update(newPasswd)
                                .digest('base64')
    await account.update({"id":req.body.id,"name":req.body.name},{$set:{passwd:encrypted}}).exec(async (err,docs)=>{
        if(err){
            throw err
            res.json({ans:"fail"})
        }
        else{
            console.log(docs)
            if(docs.n != 1){
                res.json({ans:"fail"})
            }
            else{
                await mailing(req.body.id+"@inu.ac.kr",newPasswd,"passwd")
                res.json({ans:"success"})
            }
            
        }
    })
})

router.post('/changePasswd',async (req,res)=>{
    const pastPasswd = crypto.createHmac('sha1',config.secret)
                                .update(req.body.pastPasswd)
                                .digest('base64')
    
    const newPasswd = crypto.createHmac('sha1',config.secret)
                                .update(req.body.newPasswd)
                                .digest('base64')
    account.find({"id":req.body.id}).exec(async (err,docs)=>{
        if(err){
            throw err
            res.json({ans:"err"})
        }
        else{
            console.log(docs[0].passwd)
            if(docs[0].passwd != pastPasswd){
                res.json({ans:"fail"})
            }
            else{
                await account.update({"id":req.body.id},{$set:{passwd : newPasswd}}).exec((err)=>{
                    if(err){
                        throw err
                        res.json({ans:"err"})
                    }
                    else{
                        res.json({ans:"success"})
                    }
                })
            }
        }
    })
})

module.exports = router