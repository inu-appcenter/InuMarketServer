const express = require('express')

const userInfo = require('./query/aQuery')

const authMiddleWare = require('./function/auth')

const router = express.Router()

router.use('/',authMiddleWare)

router.post('/startChat',async (req,res)=>{
     const chatRoomId = req.decoded.id+req.body.sellerId+req.body.productId
     res.status(200).json({"roomId" : await userInfo.startChat(req.decoded.id,req.body.sellerId,chatRoomId)})
})


module.exports = router