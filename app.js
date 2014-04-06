var express = require('express');
var app = express();

app.use(express.errorHandler());

app.get('/', function(req, res){
    res.redirect("https://api.venmo.com/v1/oauth/authorize?client_id=1675&scope=make_payments%20access_profile");
});

app.get('/authorized', function(req, res){
    accessToken = req.query.access_token;
    res.send(accessToken);
});

app.listen(1337);
console.log('Listening on port 1337');
