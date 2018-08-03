const express = require('express')
const router = express.Router()
const product = require('./model/product')
const authMiddleware = require('./function/auth')

router.use('/',authMiddleware)

router.post('/main',(req,res)=> {
    product.find({}).sort({updateDate:'desc'}).exec(function(err,docs){
        if(err){
            throw err
        }
        else{
            res.send(docs)
        }
    })
})


module.exports = router