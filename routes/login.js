const express = require("express");
const router = express.Router();

router.post('/',function(req,res,next){
    if(req.query.id === null || req.query.id === undefined){
        res.send(false);
    }
    else {
        if(req.query.id != "201301484"){
            res.send(false);
        }
        else {
            if(req.query.passwd != "0"){
                res.send(false);
            }
            else{
                res.send(true);
            }
        }
    }
})

module.exports = router;