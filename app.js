const express = require('express'),
      path = require("path"),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      config = require('./routes/config/config')
      


var login = require("./routes/login"),
    account = require('./routes/account'),
    check = require('./routes/check'),
    imgUpload = require('./routes/imgUpload'),
    test = require('./routes/test'),
    productUpload = require('./routes/productUpload'),
    productSelect = require('./routes/productSelect'),
    verified = require('./routes/verified'),
    letter = require('./routes/letter'),
    stateChange = require('./routes/stateChange'),
    readBanner = require('./routes/readBanner'),
    report = require('./routes/report')

const tlogin = require("./testRoutes/login"),
taccount = require('./testRoutes/account'),
tcheck = require('./testRoutes/check'),
timgUpload = require('./testRoutes/imgUpload'),
ttest = require('./testRoutes/test'),
tproductUpload = require('./testRoutes/productUpload'),
tproductSelect = require('./testRoutes/productSelect'),
tverified = require('./testRoutes/verified'),
tletter = require('./testRoutes/letter'),
tstateChange = require('./testRoutes/stateChange'),
treadBanner = require('./testRoutes/readBanner'),
treport = require('./testRoutes/report')


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
app.use('/imgUpload',imgUpload)
app.use('/imgload',express.static('image'))
app.use('/iosBanner',express.static('iosbanner'))
app.use('/test',test)
app.use('/Pupload',productUpload)
app.use('/PSelect',productSelect)
app.use('/verified',verified)
app.use('/letter',letter)
app.use('/stateChange',stateChange)
app.use('/readBanner',readBanner)
app.use('/report',report)

//test Server Routes
app.use("/tlogin",tlogin);
app.use('/taccount',taccount);
app.use('/tcheck',tcheck);
app.use('/timgUpload',timgUpload)
app.use('/timgload',express.static('timage'))
app.use('/ttest',ttest)
app.use('/tPupload',tproductUpload)
app.use('/tPSelect',tproductSelect)
app.use('/tverified',tverified)
app.use('/tletter',tletter)
app.use('/tstateChange',tstateChange)
app.use('/treadBanner',treadBanner)
app.use('/treport',treport)


app.use(function(req,res,next) {
    var err = new Error ("Not Found");
    err.status = 404;
    next(err);
});

app.get("/", (req,res) => res.send("Hello Express"));

http.listen(7000, () => console.log("express listening on posrt 7000"));