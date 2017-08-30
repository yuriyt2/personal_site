var express = require('express');
var app = express();
var port = process.env.PORT
app.use(express.static('public'));

app.listen(port);

//if route is dead, return to root
app.use(function(req, res, next) {
    res.redirect("/");
});