const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,'image/')
    },
    filename : function(req,file,cb) {
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const upload = multer({storage: storage})

var product = require('./model/product')

router.post('/',upload.array('userfile',8), async (req,res) => {
    console.log(req.files)
    console.log(req.body)

    const nowDate = new Date();
    var newProduct = new product();
    newProduct.productName = req.body.productName;
    newProduct.productState = req.body.productState;
    newProduct.productPrice = req.body.productPrice;
    newProduct.category = req.body.category;
    newProduct.productInfo = req.body.productInfo;
    newProduct.method = req.body.method;
    newProduct.place = req.body.place;
    newProduct.sellerId = req.body.id;
    newProduct.updateDate = nowDate;
    await req.files.map(Data => 
        newProduct.productImg.push(Data.filename)   
    )
    await newProduct.save(function(err) {
        if(err){
            console.error(err);
            res.send(false)
            return;
        }
        console.log("입력완료")
        return;
    })
    res.send(true); 

})

module.exports = router