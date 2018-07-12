const express = require('express');
const router = express.Router();
var account = require('../model/account');

var checkId = async function(reqId) {
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
    console.log(checkId);
    return checkId;
}

router.post('/',async (req,res) => {
    try{

        console.log(req.query.id);
        var checkIdValue = await checkId(req.query.id)
        console.log(checkIdValue);
        if(checkIdValue === 1 ) {
            var newAccount = new account();
            newAccount.name = req.query.name;
            newAccount.major = req.query.major;
            newAccount.id = req.query.id;
            newAccount.tel = req.query.tel;
            newAccount.passwd = req.query.passwd;
            newAccount.certification = false;
            newAccount.userState = true;
             
            await newAccount.save(function(err) {
                if(err) {
                    console.error(err);
                    return;
                }
                console.log(newAccount.name +"회원가입성공")
                return;
            })
            res.send(true);
        }
        else{
            res.send(false);
            return false;
        }
    }catch(error) {
        res.send(false);
        console.log(error);
    }
})

module.exports = router;