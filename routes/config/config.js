module.exports = {
    'secret' : 'INUMSeCrEtKeY',
    'mongodbUri' : 'mongodb://localhost/INUM'
}





















/*const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const User = require('../model/account');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    

    passport.use('signup',new LocalStrategy({
        usernameField : 'id',
        passwordField : 'passwd',
        passReqToCallback:true
    },
    function(req,id,passwd,done) {
        User.findOne({"id":id},function(err,ans){
            if(err) return done(err);
            if(ans) {
                return done(null,false)
            }else {
                var newUser = new User();
                newUser.name = req.query.name;
                newUser.id = req.query.id;
                newUser.tel = req.query.tel;
                newUser.passwd = req.query.passwd;
                newUser.certification = false;
                newUser.userState = true;
                newAccount.save(function(err) {
                    if(err) {
                        console.error(err);
                        return;
                    }
                    console.log(newAccount.name +"회원가입성공")
                    return done(null,newUser);
                })
            }
            
        })
    }))

    passport.use('login',new LocalStrategy({
        usernameField:'id',
        passwordField:'password',
        passReqToCallback:true
    },
    function(req,id,passwd,done){
        User.findOne({'id':id},function(err,ans){
            if(err)
                return done(err);
            if(!ans)
                return done(null,false)
            if(!user.validPassword(passwd))
                return done(null,false)
            return done(null,ans);
        });
    }));*/


