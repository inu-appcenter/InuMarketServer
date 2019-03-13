const express = require('express')
const router = express.Router()
var product = require('./model/product')
const send = require('./config/sendEmail')
const noti = require('./config/sendFCM')


router.post('/',async (req,res)=>{
    noti("hi")

  //  send("limson222@gmail.com","fjfj")
    res.send(true)
})

module.exports = router