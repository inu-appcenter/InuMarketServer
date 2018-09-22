var account = require('../model/account');

module.exports = async function(reqId) {
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
}