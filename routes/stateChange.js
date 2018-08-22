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
            res.json({ans:false})
        }
        else{
            res.json({ans:true})
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
            res.json({ans:false})
        }
        else{
            if(docs.n != 1){
                res.json({ans:false})
            }
            else{
                await mailing(req.body.id+"@inu.ac.kr",newPasswd,"passwd")
                res.json({ans:true})
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
            if(docs[0].passwd != pastPasswd){
                res.json({ans:false})
            }
            else{
                await account.update({"id":req.body.id},{$set:{passwd : newPasswd}}).exec((err)=>{
                    if(err){
                        throw err
                        res.json({ans:"err"})
                    }
                    else{
                        res.json({ans:true})
                    }
                })
            }
        }
    })
})

router.post('/changeTell',async(req,res) =>
{
    await account.update({"id":req.body.id},{$set:{tel: req.body.newTel}}).exec((err) =>{
        if(err) {
            throw err
            res.json({ans:"err"})
        }
        else{
            res.json({ans:true})
        }
    })
})

module.exports = router