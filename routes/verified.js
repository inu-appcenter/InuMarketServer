const express = require('express')
const router = express.Router()
const account = require('./model/account')

router.get('/:URL',async (req,res)=>{
    const URL = req.params.URL

    account.update({"accountId":URL},{$set:{certification:1}},function(err,docs){
        if(err){
            console.error(err)
            res.send('<h3>인증이 실패하였습니다</h3>')
        }
        else{
            console.log(docs)
            res.send('<h3>인증이 성공하였습니다</h3>')
        }
    })

    console.log(req.params.URL)
})

module.exports = router