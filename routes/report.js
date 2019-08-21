const express = require('express')
const router = express.Router()
const reportQuery = require('./query/rQuery')

const authMiddleware = require('./function/auth')
router.use('/',authMiddleware)

const sendSuccess = (res) => {
    res.status(200).send("success")
}

const sendFail = (res) => {
    res.status(400).send("fail")
}

router.post('/',async (req,res) => {
    if(req.body.kind != "moonHee"){
        const sendQuery = {
            sender: req.decoded.id,
            kind : req.body.kind,
            productId : req.body.productId
        }
        await reportQuery.nineOneOne(sendQuery) ? sendSuccess(res) : sendFail(res)
    } 
    else {
        const sendQuery = {
            sender: req.decoded.id,
            context : req.body.context
        }
        await reportQuery.moonHee(sendQuery) ? sendSuccess(res) : sendFail(res)
    }
})

router.get('/read',async (req,res)=>{
    res.status(200).send(await reportQuery.reportRead())
})

module.exports=router