const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const account = require('./model/account')
const authMiddleware = require('./function/auth')

router.use('/', authMiddleware)

router.post('/',function(req,res,next){
    res.json({
        success:true,
        info: req.decoded
    })
    
    /*const token = req.headers['x-access-token'] || req.query.token

    if(!token) {
        return res.status(403).json({
            success:false,
            message : 'not logged in'
        })
    }

    const p = new Promise(
        (resolve,reject) => {
            jwt.verify(token,req.app.get('jwt-secret'), (err,decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }   
    )


    const respond = (token) => {
        res.json({
            success:true,
            info: token
        })
    }

    const onError = (error) => {
        res.status(403).json({
            success:false,
            message:error.message
        })
    }

    p.then(respond).catch(onError)*/
})

module.exports = router