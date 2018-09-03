const express = require('express')
const router = express.Router()
const readBanner = require('./model/banner')

router.post('/', async(req,res) => {
    readBanner.find({}).exec((err,docs)=>{
        if(err) throw err
        else {
            res.send(docs[0])
        }
    })
})

module.exports = router();