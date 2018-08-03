const express = require('express')
const multer = require('multer')
const router = express.Router()
const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,'image/')
    },
    filename : function(req,file,cb) {
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const upload = multer({storage: storage})

router.post('/',upload.array('userfile',8),(req,res) => {
    res.send('Upload : ' +req.file)
    console.log(req.files);
    console.log(req.body)
})

module.exports = router