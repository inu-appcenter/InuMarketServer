const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('./config/config')
const authMiddleWare = require('./function/auth')
const saveFCM = require('./query/aQuery')
let returnJson = {}
let returnStatus

router.use('/myPage',authMiddleWare)
router.use('/changeTel',authMiddleWare)
router.use('/changePassword',authMiddleWare)


router.post('/signUp',(req,res)=>{
    const signUpOptions = {
        url : config.signUpPath,
        headers : {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        method : 'POST',
        form:{
            id:req.body.id,
            passwd : req.body.passwd,
            tel : req.body.tel,
            major : req.body.major,
            name : req.body.name
        },
        json:true
    }
    request.post(signUpOptions,(err,response)=>{
        if(!err){
            switch (response.statusCode){
                case 200:
                    returnStatus = 200
                    returnJson = {
                        ans : response.body.answer
                    }
                    break
                case 400:
                    returnStatus = 400
                    returnJson = {
                        ans : response.body.answer
                    }
                    break
                default:
                    break
            }
            res.status(returnStatus).json(returnJson)
            return response
        }else{
            console.log(err)
        }
    })
})

 router.post('/signIn',async (req,res)=>{
    const signInOptions = {
        url : config.signInPath,
        headers : {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        form :{
            id : req.body.id,
            passwd : req.body.passwd
        },
        json:true
    }
    request.post(signInOptions,(err,response)=>{
        if(!err){
            switch (response.statusCode){
                case 200:
                    returnStatus = 200
                    returnJson = {
                        token : response.body.token
                    }
                    saveFCM.saveFCM(req.body.id,req.body.FCM)
                    break
                case 400:
                    returnStatus = 400
                    returnJson = {
                        ans : response.body.ans
                    }
                    break
                default:
                    break
            }
            res.status(returnStatus).json(returnJson)
            return response
        }else{
            console.log(err)
        }
    })

})

router.put('/changeTel',(req,res)=>{
    const changeQuery = {
        url : config.changeInfoPath,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        method : 'POST',
        form : {
            id : req.decoded.id,
            passwd : req.body.passwd,
            newPasswd : "",
            tel : req.body.tel,
            major : req.decoded.major,
            name : req.decoded.name
        },
        json : true
    }
    request.post(changeQuery,(err,response)=>{
        if(!err){
            switch(response.statusCode){
                case 200 :
                    returnStatus = 200
                    returnJson = {
                        ans : "success"
                    }
                break
                
                case 400 :
                    returnStatus = 400
                    returnJson = {
                        ans : "password"
                    }
                break

                default:
                break
            }
            res.status(returnStatus).json(returnJson)
        }
        else{
            console.log(err)
        }
    })
})

router.put('/changePassword',async(req,res)=>{
    const changeQuery = {
        url : config.changeInfoPath,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        method : 'POST',
        form : {
            id : req.decoded.id,
            passwd : req.body.passwd,
            newPasswd : req.body.newPasswd,
            tel : req.decoded.tel,
            major : req.decoded.major,
            name : req.decoded.name
        },
        json : true
    }
    request.post(changeQuery,(err,response)=>{
        if(!err){
            switch(response.statusCode){
                case 200 :
                    returnStatus = 200
                    returnJson = {
                        ans : "success"
                    }
                break
                case 400 :
                    returnStatus = 400
                    returnJson = {
                        ans : "password"
                    }
                break

                default:
                break
            }
            res.status(returnStatus).json(returnJson)
        }
        else{
            console.log(err)
        }
    })
})

router.put('/tmpPasswd', async(req,res)=>{
    const tmpPasswdQuery = {
        url : config.tmpPasswdPath,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form : {
            id : req.body.id,
            name : req.body.name
        },
        json : true
    }

    request.post(tmpPasswdQuery,(err,response)=>{
        if(!err){
            switch(response.statusCode){
                case 200 :
                    returnStatus = 200
                    returnJson = {
                        ans : "success"
                    }
                break
                case 400 :
                    returnStatus = 400
                    returnJson = {
                        ans : "fail"
                    }
                    break
                default :
                break
            }
            res.status(returnStatus).json(returnJson)
        }
        else{
            console.log(err)
        }
    })
})

router.get('/myPage',async (req,res) => {
    let decodedQuery = {
        id : req.decoded.id,
        name : req.decoded.name,
        major : req.decoded.major,
        tel : req.decoded.tel
    }
    res.status(200).json(decodedQuery)
})

router.get('/major',(req,res)=>{
    const majorArray = ["건설환경공학부", "경영학부", "경제학과", "공연예술학과", "국어교육과", "국어국문학과", "글로벌물류학과", "기계공학과","도시건축학부", "도시공학과", "도시시설관리공학과","도시행정학과","독어독문학과", "디자인학부"
    ,"러시아통상학과","메카트로닉스공학과", "무역학부", "문헌정보학과", "물리학과", "미국통상학과",
    "바이오경영학과", "법학부", "불어불문학과",
    "사회복지학과", "산업경영공학과", "생명공학부", "생명과학부", "세무회계학과", "소비자·아동학과", "수학과", "수학교육과", "신문방송학과", "신소재공학과"
    ,"안전공학과", "에너지화학공학과", "역사교육과", "영어교육과", "영어영문학과", "운동건강과학부", "유아교육과", "영어교육과", "영어영문학과", "유아교육과", "윤리교육과", "융합시스템공학과", "일본통상학과", "일어교육과", "일어일문학과", "임베디드시스템공학과", "일본통상학과"
    ,"전기공학과", "전자공학과", "정보전자공학과", "정보통신공학과", "정치외교학과", "조형예술학부", "중국통상학과", "중어중국학과"
    ,"창의인재개발학과", "체육교육과", "체육학부"
    ,"컴퓨터공학부"
    ,"패션산업학과"
    ,"해양학과", "행정학과", "화학과"]
    res.json({major:majorArray})
})





module.exports = router
