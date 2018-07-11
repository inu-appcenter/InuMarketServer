const express = require('express'),
      path = require("path"),
      login = require("./routes/login");


var app = express(),
    router = express.Router();



app.use("/login",login);

app.use(function(req,res,next) {
    var err = new Error ("Not Found");
    err.status = 404;
    next(err);
});

app.get("/", (req,res) => res.send("Hello Express"));

app.listen(7000, () => console.log("express listening on posrt 7000"));