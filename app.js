const express = require('express');

var app = express();

app.use(function(req,res,next) {
    var err = new Error ("Not Found");
    err.status = 404;
    next(err);
});

app.get("/", (req,res) => res.send("Hello Express"));

app.listen(3300, () => console.log("express listening on posrt 3300"));