const express = require('express');
const router = express.Router();
var account = require('./model/account');
const letter = require('./model/letter')
const product = require('./model/product')

var checkId = require('./function/checkId');
const crypto = require('crypto')
const config = require('../routes/config/config')
const sendVerifiMail = require('../routes/config/sendEmail')
const path = require('path')
const fs = require('fs')
      logDir = 'log'
      winston = require('winston')
require('winston-daily-rotate-file')
if(!fs.existsSync(logDir)) fs.mkdirSync(logDir)
const logFilename = path.join(__dirname, '/../', logDir, '/application-%DATE%-accouont.log');
let transport = new(winston.transports.DailyRotateFile)({
    filename:logFilename,
    datePattern : 'YYYY-MM-DD',
    zippedArchive: true
})
let logger = winston.createLogger({
    transports:[
        transport
    ]
});
const nowDate = new Date();

router.post('/',async (req,res) => {
    try{
        var checkIdValue = await checkId(req.body.id)
        console.log(req.body)
        if(checkIdValue === 1 ) {
            let passwd = req.body.passwd
            const encrypted = crypto.createHmac('sha1', config.secret)
                                .update(passwd)
                                .digest('base64')
            var newAccount = new account();
            newAccount.name = req.body.name;
            newAccount.id = req.body.id;
            newAccount.tel = req.body.tel;
            newAccount.passwd = encrypted;
            newAccount.certification = false;
            newAccount.userState = true;
             
            await newAccount.save(async function(err,docs) {
                if(err) {
                    console.error(err);
                    return;
                }
                await sendVerifiMail(docs.id+"@inu.ac.kr",docs.accountId,"account")
                logger.info("ip = "+req.connection.remoteAddress+" time = "+nowDate+newAccount.name +"회원가입성공")
                return;
            })
            res.json({ans : true });
        }
        else{
            logger.error("ip = "+req.connection.remoteAddress+" time = "+nowDate+req.body.name+"회원가입실패")
            res.json({ans : false});
        }
    }catch(error) {
        logger.error("ip = "+req.connection.remoteAddress+" time = "+nowDate+" "+error)
        console.log(error);
        res.json({ans : false});
    }
})

router.post('/delete',async (req,res)=>{
    account.find({"id":req.body.id}).exec(async(err,docs)=>{
        if(err || docs[0]==undefined || docs[0]==[]) res.json({ans:false})
        else{
            const encrypted = crypto.createHmac('sha1', config.secret)
                                .update(req.body.passwd)
                                .digest('base64')
            if(encrypted != docs[0].passwd){
                res.json({ans:false})
            }
            else{
                await docs[0].letterNum.map(Data => letter.remove({"letterId":Data}).exec(async (err)=>{
                    if(err) res.json({ans:false})
                    else{
                        console.log("success to remove "+Data)
                        await account.update({"id":req.body.id},{$pull:{letterNum:Data}}).exec( (err)=>{
                            if(err) res.json({ans:false})
                            console.log("pop the letter in id " + req.body.id)
                        })
                    }
                }))
     
                await docs[0].myProductNum.map(Data => product.remove({"productId":Data}).exec(async (err)=>{
                     if(err) res.json({ans:false})
                     else{
                         console.log("success to remove "+Data)
                         await account.update({"id":req.body.id},{$pull:{myProductNum:Data}}).exec( (err)=>{
                             if(err) res.json({ans:false})
                             console.log("pop the letter in id " + req.body.id)
                         })
                     }
                 }))
                 await account.remove({"id":req.body.id}).exec((err)=>{
                     if(err) res.json({ans:false})
                     else{
                         res.json({ans:true})
                     }
                 })
            }
           
        }
    })
})

module.exports = router;