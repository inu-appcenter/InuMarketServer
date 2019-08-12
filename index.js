const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')




const account = require('./routes/account')
const product = require('./routes/product')


const app = express()

const server = require("http").createServer(app)
const io = require("socket.io")(server)

io.on('connection',(socket)=>{
    console.log(socket.id)
})

// require('./chatRouter')(io);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function() {
    console.log("db connect");
});
mongoose.connect('mongodb://localhost/newINUM')

app.use('/account',account)
app.use('/product',product)
app.use('/imgload',express.static('files'))
app.use('/iosBanner',express.static('iosbanner'))
app.use('/andBanner',express.static('andbanner'))

server.listen(7000, ()=>{console.log("express work")})
