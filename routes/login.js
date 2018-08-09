const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const account = require('./model/account')

const nowDate = new Date();
router.post('/',function(req,res,net){
    const {id,passwd} = req.body
    const secret = req.app.get('jwt-secret')
    const check = (id) => {
        if(!id) {
            console.log("ip = "+req.connection.remoteAddress+" time = "+nowDate)
            console.log("worng id")
            throw new Error('flase')
        }else {
            if(id.verify(passwd)) {
                if(id.certification === true){
                    const p = new Promise((resolve,reject) => {
                        jwt.sign(
                            {
                                _id:id._id,
                                id: id.id,
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if(err) reject(err)
                                resolve(token)
                            }
                        )
                    })
                    console.log("ip = "+req.connection.remoteAddress+" time = "+nowDate)
                    console.log(id.id+"님 login success!")
                    return p 
                }
                else{
                    throw new Error('certification')
                }
                
            } else {
                console.log("ip = "+req.connection.remoteAddress+" time = "+nowDate)
                console.log("wrong password");
                throw new Error ('false')
            }
        }
    }

    //respond the token
    const respond = async (token) => {
        await account.find({"id":id}).exec(function(err,docs){
            if(err) console.error(err)
            console.log(docs[0])
            res.json({
                message : 'logged in success',
                token,
                id:docs[0].id,
                name:docs[0].name,
                tel : docs[0].tel,
                letter : docs[0].letterNum.length,
                product : docs[0].myProductNum.length
            })
        })
        
    }

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }
    //find the account
    account.findOnByAccountId (id)
    .then(check)
    .then(respond)
    .catch(onError)
})

module.exports = router;
/*const express = require("express");
const router = express.Router();

router.get('/',function(req,res,next){
    res.send("this is get");
})

router.post('/',function(req,res,next){
    if(req.query.id === null || req.query.id === undefined){
        res.send(false);
    }
    else {
        if(req.query.id != "201301484"){
            res.send(false);
        }
        else {
            if(req.query.passwd != "0"){
                res.send(false);
            }
            else{
                res.send(true);
            }
        }
    }
})

module.exports = router;*/