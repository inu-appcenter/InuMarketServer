const express = require('express')
const router = express.Router()
const product = require('./model/product')

router.post('/main',(req,res)=> {
    product.find({}).sort({updateDate:'desc'}).exec(function(err,docs){
        if(err){
            throw err
        }
        else{
            console.log(docs)
            res.send(docs)
        }
    })
})


module.exports = router