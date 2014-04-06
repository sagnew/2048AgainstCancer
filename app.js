var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.redirect("https://api.venmo.com/v1/oauth/authorize?client_id=1675&scope=make_payments%20access_profile");
});

app.get('/authenticated', function(req, res){
    console.log(req.body);
    res.send("hello");
});

app.listen(1337);
console.log('Listening on port 1337');
