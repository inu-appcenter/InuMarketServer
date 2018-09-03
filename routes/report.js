const express = require('express')
const router = express.Router()
const report = require('./model/report')


router.post('/',async(req,res) => {
    if(req.body.kind != "moonHee"){
        const nineOneOneReport = new report()
        nineOneOneReport.sender = req.body.senderId
        nineOneOneReport.context = req.body.kind +"분야로 '"+req.body.productId + "' 아이템 신고되엇습니다"
        nineOneOneReport.save(async(err)=>{
            if(err) throw err
            res.json({ans:true})
        })
    } 
    else {
        const moonHeeReport = new report()
        moonHeeReport.sender = req.body.senderId
        moonHeeReport.context = req.body.context
        moonHeeReport.save(async(err) =>{
            if(err) throw err
            res.json({ans:true})
        })
    }
})

router.post('/read',async(req,res)=>{
    report.find({}).exec((err,docs)=>{
        if(err) throw err
        res.send(docs[0])
    })
})

module.exports=router