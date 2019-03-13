const express = require('express')
const router = express.Router()
const letter = require('./model/letter')
const account = require('./model/account')
const product = require('./model/product')
const noti = require('./config/sendFCM')

router.post('/send',async (req,res)=>{
    const sellerLetter = new letter() //판매자에게 가는 쪽지
    const customerLetter = new letter() //구매자에게 가는 쪽지
    const nowDate = new Date()


    //판매자에게 가는 쪽지 변수할당
    sellerLetter.sendId = req.body.custId
    sellerLetter.reciveId = req.body.sellerId
    sellerLetter.sellBuy = true //판매중인상품
    sellerLetter.letterRead = false
    sellerLetter.productId = req.body.productId
    sellerLetter.productName = req.body.productName
    sellerLetter.productCategory = req.body.category
    sellerLetter.productSelled = false
    sellerLetter.sendDate = nowDate
    

    //구매자에게 가는 쪽지 변수할당
    customerLetter.sendId = req.body.sellerId
    customerLetter.reciveId = req.body.custId
    customerLetter.sellBuy = false//구매중인상품
    customerLetter.letterRead = false
    customerLetter.productId = req.body.productId
    customerLetter.productName = req.body.productName
    customerLetter.productCategory = req.body.category
    customerLetter.productSelled = false
    customerLetter.sendDate = nowDate



    
    //본인에게 전송 막기
    if(req.body.sellerId == req.body.custId){
        res.json({ans:"false"})
    }else{

        
        //쪽지 중복 체크
        await letter.find({"sendId":req.body.custId,"reciveId":req.body.sellerId,"productId":req.body.productId})
        .exec(async (err,docs)=>{
            
            //오류 핸들링
            if(err) throw err
            
            //오류 아닐시에
            else{

                //쪽지 중복확인시 중복이 아닐경우
                if(docs[0]==undefined || docs[0]=="undefined"){
                    
                    //쪽지 저장할때 계정정보 불러오기위한 쿼리
                    await account.find({"id":req.body.custId}).exec( //불러올시
                        async (err,docs)=>{
                            
                            //계정 찾기에 오류시에
                            if(err) throw err

                            //계정 찾기 성공시
                            else{

                                //쪽지저장할때 보내는사람 번호와 이름 변수에 할당
                                sellerLetter.senderPhone = await docs[0].tel
                                sellerLetter.senderName = await docs[0].name

                                //쪽지 저장
                                await sellerLetter.save(async (err,docs)=>{
                                    
                                    //쪽지저장에 에러발생시
                                    if(err){
                                        console.log(err);
                                        throw err
                                    }
                                    //쪽지저장에 성공시
                                    else{

                                        //계정에 쪽지 정보 추가
                                        await account.update({"id":docs.sendId},
                                        {$push:{letterNum:docs.letterId}},
                                        {upsert:true})
                                        console.log("to"+req.body.sellerId+"from"+req.body.custId)
                                    }
                                })
                            }
                        }
                    )
                }
            }
        })
    
        //쪽지 중복확인
        await letter.find({"sendId":req.body.sellerId,"reciveId":req.body.custId,"productId":req.body.productId})
        .exec(async (err,docs)=>{

            //에러시
            if(err) throw err

            //계속진행
            else{

                //중복이 아닐시에
                if(docs[0]==undefined || docs[0]=="undefined"){

                    //계정정보확인
                    await account.find({"id":req.body.sellerId}).exec(
                        async (err,docs)=>{
                            
                            //오류 발생시
                            if(err) throw err

                            //계속진행
                            else{

                                //폰번호와 이름 변수할당
                                customerLetter.senderPhone = await docs[0].tel
                                customerLetter.senderName = await docs[0].name
                                
                                //쪽지 저장
                                await customerLetter.save(async(err,docs)=>{
                                    
                                    //에러 핸들링
                                    if(err){
                                        console.log(err)
                                        throw err
                                    }

                                    //진행
                                    else{

                                        //계정에 쪽지정보 저장
                                        await account.update({"id":docs.sendId},
                                        {$push:{letterNum:docs.letterId}},
                                        {upsert:true})
                                        console.log("to"+req.body.custId+"from"+req.body.sellerId)
                                    }
                                })
                            }
                        }
                    )
                }
            }
        })

        //관심점수 올리기 위한 쿼리 쪽지 테이블에서 판매자또는 구매자 이름으로 쪽지가 있는지 확인
        await letter.find({$or:[{"sendId":req.body.sellerId},{"sendId":req.body.custId}],"productId":req.body.productId})
        .exec(async (err,docs)=>{
            if(err) throw err
            else {

                //두곳다 없을시에
                if(docs[0]==undefined || docs[0]=="undefined"){

                    //물건 변수 처리
                    await product.update({"productId" : req.body.productId},{$inc:{productStar:1}}).exec(async (err,docs) => {
                        if(err){
                            throw err
                        }
                        else{
                            //푸쉬알람
                            await noti(req.body.sellerId)
                            
                            //쪽지전송 성공리턴
                            res.json({ans:"true"})
                        }
                    })
                }
                else{

                    //중복전송 리턴
                    res.json({ans:"duplicate"})
                }
                
            }
        })
}
})

router.post('/list',async (req,res)=>{
    letter.find({"reciveId":req.body.id}).sort({sendDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw err
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/buyList',async (req,res)=>{
    letter.find({"reciveId":req.body.id,"sellBuy":false}).sort({sendDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw err
            res.json({ans:"false"})
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/sellList',async (req,res)=>{
    letter.find({"reciveId":req.body.id,"sellBuy":true }).sort({sendDate:"desc"}).exec((err,docs)=>{
        if(err){
            throw err
            res.json({ans:"false"})
        }
        else{
            res.send(docs)
        }
    })
})

router.post('/delete',async (req,res)=>{
    await letter.remove({"letterId":req.body.letterId}).exec((err)=>{
        if(err){
            res.json({ans:false})
        }
    })

    await account.update({"id":req.body.id},{$pull:{letterNum:req.body.letterId}}).exec((err)=>{
        if(err){
            res.json({ans:false})
        }
        else{
            res.json({ans:true})
        }
    })
})

module.exports = router