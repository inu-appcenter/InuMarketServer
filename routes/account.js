const express = require('express');
const router = express.Router();
var account = require('./model/account');
var checkId = require('./function/checkId');
const crypto = require('crypto')
const config = require('./config/config')
const sendVerifiMail = require('./config/sendEmail')

/*var checkId = async function(reqId) {
    var checkId =0;
    await account.find({},function(err,ans){
        if(err) throw err;
        else{
            if(ans[0] === null || ans[0] === undefined || ans[0] ===""){
                console.log("중복되는 아이디 없음");
                checkId = 1;
            }
            else{
                console.log("중복되는 아이디 있음");
                checkId = 0;
            }
            
        }
    }).where("id").equals(reqId)
    return checkId;
}*/

router.post('/',async (req,res) => {
    try{
        const nowDate = new Date();
        console.log("ip = "+req.connection.remoteAddress+" time = "+nowDate)
        var checkIdValue = await checkId(req.body.id)
        if(checkIdValue === 1 ) {
            let passwd = req.body.passwd
            const encrypted = crypto.createHmac('sha1', config.secret)
                                .update(passwd)
                                .digest('base64')
            var newAccount = new account();
            newAccount.name = req.body.name;
            newAccount.id = req.body.id;
            newAccount.tel = req.body.tel;
            newAccount.passwd = encrypted;
            newAccount.certification = false;
            newAccount.userState = true;
             
            await newAccount.save(async function(err,docs) {
                if(err) {
                    console.error(err);
                    return;
                }
                await sendVerifiMail(docs.id+"@inu.ac.kr",docs.accountId,"account")
                console.log(newAccount.name +"회원가입성공")
                return;
            })
            res.json({ans : true });
        }
        else{
            res.json({ans : false});
            return false;
        }
    }catch(error) {
        res.json({ans : false});
        console.log(error);
    }
})

module.exports = router;