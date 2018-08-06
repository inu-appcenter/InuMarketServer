module.exports = async function(createUser,url){
    const nodemailer = require('nodemailer')

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            type:'OAuth2',
             // generated ethereal password
        }
    })
    /*transporter.set('oauth2_provision_cb',(user,renew,callback)=> {
        let accessToken = userToken[user];
        if(!accessToken){
            return callback(new Error('Unknown user'))
        }
        else {
            return callback(null,accessToken)
        }
    })*/

    let mailOptions = {
        from:"Do Not reply<user@gmail.com>",
        to:createUser,
        subject:"중고나라 인증메일입니다.",
        text:"다음 링크를 클릭하시고 인증을 완료해주세요 117.16.231.66:7000/verified/"+url
    }

    transporter.sendMail(mailOptions,function(err,response){
        if(err){
            console.error(err)
        }
        else {
            console.log("Message sent : "+ createUser)
        }
        transporter.close()
    })
}