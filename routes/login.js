const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const account = require('./model/account')

const nowDate = new Date();
router.post('/',function(req,res,net){
    console.log(req.body);
    const {id,passwd} = req.body
    const secret = req.app.get('jwt-secret')
    const check = (id) => {
        if(!id) {
            console.log("ip = "+req.connection.remoteAddress+" time = "+nowDate)
            console.log("worng id")
            throw new Error('login failed')
        }else {
            if(id.verify(passwd)) {
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
                console.log("login success!")
                return p 
            } else {
                console.log("ip = "+req.connection.remoteAddress+" time = "+nowDate)
                console.log("wrong password");
                throw new Error ('login failed : wrong password')
            }
        }
    }

    //respond the token
    const respond = (token) => {
        res.json({
            message : 'logged in success',
            token
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