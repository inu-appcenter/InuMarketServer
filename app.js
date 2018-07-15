const express = require('express'),
      path = require("path"),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      config = require('./routes/config/config');

var login = require("./routes/login"),
    account = require('./routes/account'),
    check = require('./routes/check');


var app = express(),
    router = express.Router();
var http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('jwt-secret', config.secret)

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });


var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function() {
    console.log("db connect");
});
mongoose.connect('mongodb://localhost/INUM')

io.on("connection", (socket) => {
    console.log("socket is connect") 
})

app.use("/login",login);
app.use('/account',account);
app.use('/check',check);

app.use(function(req,res,next) {
    var err = new Error ("Not Found");
    err.status = 404;
    next(err);
});

app.get("/", (req,res) => res.send("Hello Express"));

http.listen(7000, () => console.log("express listening on posrt 7000"));